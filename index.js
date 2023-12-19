const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const pool = require("./utils/database");
const resultatsRapports = require("./utils/resultats_rapports");
const passport = require("passport");
const PORT = process.env.PORT || 3309;
const dotenv = require("dotenv");

const sessionSecret = process.env.SESSION_SECRET || "defaultSecretKey";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: sessionSecret, resave: true, saveUninitialized: true })
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
  },
  {
    id: 2,
    username: process.env.USER_2_USERNAME,
    firstName: process.env.USER_2_FIRSTNAME,
    lastName: process.env.USER_2_LASTNAME,
    email: process.env.USER_2_EMAIL,
    password: process.env.USER_2_PASSWORD,
  },
  {
    id: 4,
    username: process.env.USER_4_USERNAME,
    firstName: process.env.USER_4_FIRSTNAME,
    lastName: process.env.USER_4_LASTNAME,
    email: process.env.USER_4_EMAIL,
    password: process.env.USER_4_PASSWORD,
  },
  {
    id: 5,
    username: process.env.USER_5_USERNAME,
    firstName: process.env.USER_5_FIRSTNAME,
    lastName: process.env.USER_5_LASTNAME,
    email: process.env.USER_5_EMAIL,
    password: process.env.USER_5_PASSWORD,
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

app.get("/mes_demandes", isAuthenticated, (req, res) => {
  res.render("mes_demandes", {
    activePage: "mes_demandes",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

app.get("/ajouter_facture", isAuthenticated, (req, res) => {
  res.render("ajouter_facture", {
    activePage: "ajouter_facture",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

app.get("/mes_factures", isAuthenticated, (req, res) => {
  res.render("mes_factures", {
    activePage: "mes_factures",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

//************************ POST forms Handlers *************//

app.post("/ajouter_demande", (req, res) => {
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
    facture,
    produit,
    prix,
    quantite,
    paiement,
    description,
    remarque,
  } = req.body;

  const insertQuery = `
        INSERT INTO demande (
            numDemande,
            nomClient,
            numTelephone,
            email,
            ville,
            adresse,
            typeClient,
            source,
            etapeActuelle,
            etatClient,
            numFacture,
            produit,
            prix,
            quantite,
            typePaiement,
            description,
            remarque
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

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
    facture,
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

app.post("/ajouter_facture", (req, res) => {
  const {
    facture,
    prix,
    quantite,
    produit,
    nomClient,
    telephone,
    adresse,
    paiement,
  } = req.body;

  const insertQuery = `
        INSERT INTO facture (
            numFacture,
            prix,
            quantite,
            produit,
            nomClient,
            numTelephone,
            adresse,
            typePaiement
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const nextNumFacture = req.body.facture;

  const values = [
    nextNumFacture,
    prix,
    quantite,
    produit,
    nomClient,
    telephone,
    adresse,
    paiement,
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
      return res.redirect("/mes_factures");
    });
  });
});

app.get("/modifier_demande", isAuthenticated, (req, res) => {
  res.render("modifier_demande", {
    activePage: "nd",
    firstName: req.session.userFirstName,
    lastName: req.session.userLastName,
  });
});

//************************ Ajax Requests Handlers *************//

app.get("/combinedDataSources", async (req, res) => {
  try {
    const rowsCount = await resultatsRapports.assignSourcesRows();
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
    };
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/combinedDataEtatClient", async (req, res) => {
  try {
    const rowsCount = await resultatsRapports.assignEtatClientRows();

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
      "SELECT numDemande, nomClient, numTelephone, email, typeClient, etapeActuelle, produit, quantite, prix, etatClient, ville, adresse, source, typePaiement, numFacture, dateEnregistrement FROM demande ORDER BY dateEnregistrement DESC",
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
      "SELECT numFacture, nomClient, numTelephone, produit, quantite, prix, adresse, typePaiement, dateEnregistrement FROM facture ORDER BY dateEnregistrement",
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

app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
