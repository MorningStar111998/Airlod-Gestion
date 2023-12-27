const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const pool = require("./utils/database");
const queryResponses = require("./utils/query_results");
const passport = require("passport");
const PORT = process.env.PORT || 3309;
const dotenv = require("dotenv");
const MySQLStore = require("express-mysql-session")(session);

const sessionSecret = process.env.SESSION_SECRET || "defaultSecretKey";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  clearExpired: true,
  checkExpirationInterval: 900000, // Vérifier et effacer les sessions expirées toutes les 15 minutes
  expiration: 86400000, // Durée de vie par défaut de la session : 1 jour
});

app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [
  {
    id: 1,
    username: process.env.USER_1_USERNAME,
    firstName: process.env.USER_1_FIRSTNAME,
    lastName: process.env.USER_1_LASTNAME,
    email: process.env.USER_1_EMAIL,
    password: process.env.USER_1_PASSWORD,
    role: process.env.USER_1_ROLE,
  },
  {
    id: 2,
    username: process.env.USER_2_USERNAME,
    firstName: process.env.USER_2_FIRSTNAME,
    lastName: process.env.USER_2_LASTNAME,
    email: process.env.USER_2_EMAIL,
    password: process.env.USER_2_PASSWORD,
    role: process.env.USER_2_ROLE,
  },
  {
    id: 4,
    username: process.env.USER_4_USERNAME,
    firstName: process.env.USER_4_FIRSTNAME,
    lastName: process.env.USER_4_LASTNAME,
    email: process.env.USER_4_EMAIL,
    password: process.env.USER_4_PASSWORD,
    role: process.env.USER_4_ROLE,
  },
  {
    id: 5,
    username: process.env.USER_5_USERNAME,
    firstName: process.env.USER_5_FIRSTNAME,
    lastName: process.env.USER_5_LASTNAME,
    email: process.env.USER_5_EMAIL,
    password: process.env.USER_5_PASSWORD,
    role: process.env.USER_5_ROLE,
  },
];

const isAuthenticated = (req, res, next) => {
  if (
    req.session.userId &&
    req.session.userFirstName &&
    req.session.userLastName
  ) {
    return next();
  }
  res.redirect("/");
};

//************************ Route Handlers *************//
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.session.userId = user.id;
    req.session.userFirstName = user.firstName;
    req.session.userLastName = user.lastName;
    req.session.userRole = user.role;

    res.redirect("/accueil");
  } else {
    res.redirect("/");
  }
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/accueil", isAuthenticated, (req, res) => {
  res.render("accueil", {
    activePage: "accueil",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

app.get("/ajouter_demande", isAuthenticated, (req, res) => {
  const getMaxNumDemandeQuery =
    "SELECT MAX(numDemande) AS maxNumDemande FROM demande";
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool :", err);
      return res.status(500).send("Internal Server Error");
    }
    connection.query(getMaxNumDemandeQuery, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error(
          "Error fetching max numDemande from the database: " + err
        );
        return res.status(500).send("Internal Server Error");
      }

      const numDemande =
        result[0].maxNumDemande !== null ? result[0].maxNumDemande + 1 : 1;

      res.render("ajouter_demande", {
        activePage: "ajouter_demande",
        firstName: req.session.userFirstName,
        lastName: req.session.userLastName,
        nextNumDemande: numDemande,
      });
    });
  });
});

app.get("/mes_demandes", isAuthenticated, async (req, res) => {
  try {
    const numDemande = await queryResponses.maxNumDemande();

    const numFacture = await queryResponses.maxNumFacture();

    res.render("mes_demandes", {
      activePage: "mes_demandes",
      firstName: req.session.userFirstName,
      lastName: req.session.userLastName,
      nextNumDemande: numDemande + 1,
      maxNumFacture: numFacture + 1,
    });
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/modifier_demande", isAuthenticated, (req, res) => {
  res.render("modifier_demande", {
    activePage: "nd",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

app.get("/ajouter_facture", isAuthenticated, async (req, res) => {
  try {
    const numFacture = await queryResponses.maxNumFacture();

    res.render("ajouter_facture", {
      activePage: "ajouter_facture",
      firstName: req.session.userFirstName,
      lastName: req.session.userLastName,
      maxNumFacture: numFacture + 1,
    });
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/mes_factures", isAuthenticated, (req, res) => {
  res.render("mes_factures", {
    activePage: "mes_factures",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

//************************ POST forms Handlers *************//

app.post("/ajouter_demande", isAuthenticated, (req, res) => {
  const {
    demande,
    destinataire,
    telephone,
    email,
    ville,
    adresse,
    typeClient,
    source,
    etape,
    etatClient,
    produit,
    prix,
    quantite,
    paiement,
    description,
    remarque,
  } = req.body;

  const insertQuery = `
    INSERT INTO demande (numDemande, nomClient, numTelephone, email, ville, adresse, typeClient, source, etapeActuelle, etatClient, produit, prix, quantite, typePaiement, description, remarque) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  const nextNumDemande = req.body.nextNumDemande;

  const values = [
    nextNumDemande,
    destinataire,
    telephone,
    email,
    ville,
    adresse,
    typeClient,
    source,
    etape,
    etatClient,
    produit,
    prix,
    quantite,
    paiement,
    description,
    remarque,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool :", err);
      return res.status(500).send("Internal Server Error");
    }
    connection.query(insertQuery, values, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error inserting data into the database: " + err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Data inserted into the database successfully!");
      return res.redirect("/mes_demandes");
    });
  });
});

app.post("/modifier_demande", isAuthenticated, (req, res) => {
  const {
    demande,
    destinataire,
    telephone,
    email,
    ville,
    adresse,
    typeClient,
    source,
    etape,
    etatClient,
    produit,
    prix,
    quantite,
    paiement,
    description,
    remarque,
  } = req.body;

  const updateQuery = `
    UPDATE demande
    SET
        nomClient = ?,
        numTelephone = ?,
        email = ?,
        ville = ?,
        adresse = ?,
        typeClient = ?,
        source = ?,
        etapeActuelle = ?,
        etatClient = ?,
        produit = ?,
        prix = ?,
        quantite = ?,
        typePaiement = ?,
        description = ?,
        remarque = ?
    WHERE numDemande = ?;
`;

  const values = [
    destinataire,
    telephone,
    email,
    ville,
    adresse,
    typeClient,
    source,
    etape,
    etatClient,
    produit,
    prix,
    quantite,
    paiement,
    description,
    remarque,
    demande,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool :", err);
      return res.status(500).send("Internal Server Error");
    }
    connection.query(updateQuery, values, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error inserting data into the database: " + err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Data updatated into the database successfully!");
      return res.redirect("/mes_demandes");
    });
  });
});

app.post("/ajouter_facture", isAuthenticated, (req, res) => {
  const {
    facture,
    prix,
    quantite,
    produit,
    nomClient,
    telephone,
    adresse,
    paiement,
    demande,
  } = req.body;

  const insertQuery = `INSERT INTO facture ( prix, quantite, produit, nomClient, numTelephone, adresse, typePaiement, numDemande) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`;
  const orderSentQuery = `UPDATE demande SET etatClient = 'Envoyé', dateEnregistrement = NOW() WHERE numDemande = ?;
`;

  const nextNumFacture = req.body.facture;

  const values = [
    prix,
    quantite,
    produit,
    nomClient,
    telephone,
    adresse,
    paiement,
    demande,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      return res.status(500).send("Internal Server Error");
    }

    connection.query(insertQuery, values, (err, result) => {
      connection.release();

      if (err) {
        console.error("Error inserting data into the database:", err);
        return res.status(500).send("Error inserting data");
      }

      pool.getConnection((err, connection) => {
        if (err) {
          console.error("Error getting connection from pool:", err);
          return res.status(500).send("Internal Server Error");
        }

        connection.query(orderSentQuery, demande, (err, results) => {
          connection.release();

          if (err) {
            console.error("Error updating order to sent:", err);
            return res.status(500).send("Error updating order to sent");
          }

          console.log("Order sent for order N°" + demande);
          return res.redirect("/mes_factures");
        });
      });
    });
  });
});

//************************ Ajax Requests Handlers *************//

app.get("/combinedDataSources", isAuthenticated, async (req, res) => {
  try {
    const rowsCount = await queryResponses.assignSourcesRows();
    const numbDemandes = await queryResponses.assignNumDemandesRows();
    const numbFactures = await queryResponses.assignNumFacturesRows();
    const numbEnvoyes = await queryResponses.numEnvoyesRows();

    const {
      whatsappRows: whatsappData,
      instagramRows: instagramData,
      messengerRows: messengerData,
      siteRows: siteData,
      landingRows: landingData,
      baORows: baOData,
      nullSourcesRows: nullSourcesData,
    } = rowsCount;
    const combinedData = {
      whatsappData,
      instagramData,
      messengerData,
      siteData,
      landingData,
      baOData,
      nullSourcesData,
      numbDemandes,
      numbFactures,
      numbEnvoyes,
    };
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/combinedDataEtatClient", async (req, res) => {
  try {
    const rowsCount = await queryResponses.assignEtatClientRows();

    const {
      interesseRows: interesseData,
      enDiscussionRows: enDiscussionData,
      attenteDeLogoRows: attenteDeLogoData,
      attenteDeConfirmationRows: attenteDeConfirmationData,
      pasDeReponseRows: pasDeReponseData,
      nonInteresseRows: nonInteresseData,
    } = rowsCount;

    const combinedData = {
      interesseData,
      enDiscussionData,
      attenteDeLogoData,
      attenteDeConfirmationData,
      pasDeReponseData,
      nonInteresseData,
    };
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/mes_demandes/table", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(
      "SELECT * FROM demande ORDER BY dateEnregistrement DESC",
      (queryErr, results) => {
        connection.release(); // Release the connection back to the pool

        if (queryErr) {
          console.error("Error fetching data from the database:", queryErr);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.json(results);
      }
    );
  });
});

app.get("/mes_factures/table", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool :", err);
      return res.status(500).send("Internal Server Error");
    }
    connection.query(
      "SELECT * FROM facture ORDER BY dateEnregistrement DESC",
      (err, results) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error("Error fetching data from the database: " + err.stack);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.json(results);
      }
    );
  });
});

app.get("/mes_demandes/demanderAuth", (req, res) => {
  res.json(req.session.userRole);
});

app.delete("/mes_demandes/supprimer_demandes", (req, res) => {
  const dataIds = req.body.ids;
  if (req.session.userRole == "SuperAdmin") {
    if (!dataIds || !Array.isArray(dataIds) || dataIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'ids' in the request body." });
    }

    const deleteQuery = `
      DELETE FROM demande
      WHERE numDemande IN (?);
    `;

    // Using a parameterized query to prevent SQL injection
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      connection.query(deleteQuery, [dataIds], (err, results) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error("Error executing delete query:", err.stack);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({
          message: "Rows deleted successfully",
          affectedRows: results.affectedRows,
        });
      });
    });
  } else {
    console.log(
      "Vous n'avez pas le niveau d'autorisation pour effectuer cette action !"
    );
    res.status(403).json({ error: "Unauthorized" });
  }
});

app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
