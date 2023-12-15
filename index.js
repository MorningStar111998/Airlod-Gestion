const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const db = require("./utils/database");
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
    id: 3,
    username: process.env.USER_3_USERNAME,
    firstName: process.env.USER_3_FIRSTNAME,
    lastName: process.env.USER_3_LASTNAME,
    email: process.env.USER_3_EMAIL,
    password: process.env.USER_3_PASSWORD,
  },
  {
    id: 4,
    username: process.env.USER_4_USERNAME,
    firstName: process.env.USER_4_FIRSTNAME,
    lastName: process.env.USER_4_LASTNAME,
    email: process.env.USER_4_EMAIL,
    password: process.env.USER_4_PASSWORD,
  },
];

const isAuthenticated = (req, res, next) => {
  if (req.session.userId && req.session.userFirstName) {
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
  });
});

app.get("/ajouter_demande", isAuthenticated, (req, res) => {
  const getMaxNumDemandeQuery =
    "SELECT MAX(numDemande) AS maxNumDemande FROM demande";
  db.query(getMaxNumDemandeQuery, (err, result) => {
    if (err) {
      console.error("Error fetching max numDemande from the database: " + err);
      return res.status(500).send("Internal Server Error");
    }

    const numDemande =
      result[0].maxNumDemande !== null ? result[0].maxNumDemande + 1 : 1;

    res.render("ajouter_demande", {
      activePage: "ajouter_demande",
      firstName: req.session.userFirstName,
      nextNumDemande: numDemande,
    });
  });
});

app.get("/mes_demandes", isAuthenticated, (req, res) => {
  db.query(
    "SELECT * FROM demande ORDER BY dateEnregistrement DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching data from the database: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      const dataArray = results.map((row) => {
        return {
          numDemande: row.numDemande,
          nomClient: row.nomClient,
          numTelephone: row.numTelephone,
          typeClient: row.typeClient,
          etapeActuelle: row.etapeActuelle,
          produit: row.produit,
          quantite: row.quantite,
          email: row.email,
          source: row.source,
          numFacture: row.numFacture,
          dateEnregistrement: row.dateEnregistrement,
        };
      });

      res.render("mes_demandes", {
        data: dataArray,
        activePage: "mes_demandes",
        firstName: req.session.userFirstName,
      });
    }
  );
});

app.get("/ajouter_facture", isAuthenticated, (req, res) => {
  res.render("ajouter_facture", {
    activePage: "ajouter_facture",
    firstName: req.session.userFirstName,
  });
});

app.get("/mes_factures", isAuthenticated, (req, res) => {
  db.query(
    "SELECT * FROM facture ORDER BY dateEnregistrement DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching data from the database: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      const dataArray = results.map((row) => {
        return {
          numFacture: row.numFacture,
          prix: row.prix,
          quantite: row.quantite,
          produit: row.produit,
          nomClient: row.nomClient,
          numTelephone: row.numTelephone,
          adresse: row.adresse,
          typePaiement: row.typePaiement,
          dateEnregistrement: row.dateEnregistrement,
        };
      });

      res.render("mes_factures", {
        data: dataArray,
        activePage: "mes_factures",
        firstName: req.session.userFirstName,
      });
    }
  );
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

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into the database: " + err);
      return res.status(500).send("Internal Server Error");
    }

    console.log("Data inserted into the database successfully!");
    return res.redirect("/mes_demandes");
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

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into the database: " + err);
      return res.status(500).send("Internal Server Error");
    }

    console.log("Data inserted into the database successfully!");
    return res.redirect("/mes_factures");
  });
});

app.get("/modifier_demande", isAuthenticated, (req, res) => {
  res.render("modifier_demande", {
    activePage: "nd",
    firstName: req.session.userFirstName,
  });
});

//************************ Ajax Requests Handlers *************//

app.get("/combinedDataSources", async (req, res) => {
  try {
    const totalRows = await resultatsRapports.assignTotalRows();
    const whatsappRows = await resultatsRapports.assignWhatsappRows();
    const messengerRows = await resultatsRapports.assignMessengerRows();
    const instagramRows = await resultatsRapports.assignInstagramRows();
    const siteRows = await resultatsRapports.assignSiteRows();
    const landingRows = await resultatsRapports.assignLandingRows();
    const baORows = await resultatsRapports.assignBaORows();
    const nullSourcesRows = await resultatsRapports.assignNullSourceRows();

    const combinedData = {
      whatsappData: whatsappRows,
      instagramData: instagramRows,
      messengerData: messengerRows,
      siteData: siteRows,
      landingData: landingRows,
      baOData: baORows,
      nullSourcesData: nullSourcesRows,
    };
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/combinedDataEtatClient", async (req, res) => {
  try {
    const interesseRows = await resultatsRapports.assignClientInteresseRows();
    const enDiscussionRows = await resultatsRapports.assignEnDiscussionRows();
    const attenteDeLogoRows = await resultatsRapports.assignAttenteDeLogoRows();
    const attenteDeConfirmationRows =
      await resultatsRapports.assignAttenteDeConfirmationRows();
    const pasDeReponseRows = await resultatsRapports.assignPasDeReponseRows();
    const nonInteresseRows = await resultatsRapports.assignNonInteresseRows();
    const combinedData = {
      clientInteresseData: interesseRows,
      enDiscussionData: enDiscussionRows,
      attenteDeLogoData: attenteDeLogoRows,
      attenteDeConfirmationData: attenteDeConfirmationRows,
      pasDeReponseData: pasDeReponseRows,
      nonInteresseData: nonInteresseRows,
    };
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/mes_demandes/filterTypeClient", (req, res) => {
  const selectedTypeClient = req.body.typeClient;

  const query =
    "SELECT * FROM demande WHERE typeClient = ? ORDER BY dateEnregistrement DESC";

  db.query(query, [selectedTypeClient], (err, results) => {
    if (err) {
      console.error(
        "Error fetching filtered data from the database: " + err.stack
      );
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(results);
  });
});
app.post("/mes_demandes/filterEtapeActuelle", (req, res) => {
  const selectedEtapeActuelle = req.body.etapeActuelle;

  const query =
    "SELECT * FROM demande WHERE etapeActuelle = ? ORDER BY dateEnregistrement DESC";

  db.query(query, [selectedEtapeActuelle], (err, results) => {
    if (err) {
      console.error(
        "Error fetching filtered data from the database: " + err.stack
      );
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(results);
  });
});
app.post("/mes_demandes/filterSource", (req, res) => {
  const selectedSource = req.body.source;

  const query =
    "SELECT * FROM demande WHERE source = ? ORDER BY dateEnregistrement DESC";

  db.query(query, [selectedSource], (err, results) => {
    if (err) {
      console.error(
        "Error fetching filtered data from the database: " + err.stack
      );
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(results);
  });
});
app.post("/mes_demandes/filterEtatClient", (req, res) => {
  const selectedEtatClient = req.body.etatClient;

  const query =
    "SELECT * FROM demande WHERE etatClient = ? ORDER BY dateEnregistrement DESC";

  db.query(query, [selectedEtatClient], (err, results) => {
    if (err) {
      console.error(
        "Error fetching filtered data from the database: " + err.stack
      );
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(results);
  });
});

app.post("/mes_demandes/recherche", (req, res) => {
  const searchInput = req.body.searchInput;
  const searchCategorie = req.body.searchCategorie;

  const allowedCategories = ["nomClient", "numTelephone", "email", "produit"];

  if (!allowedCategories.includes(searchCategorie)) {
    res.status(400).send("Invalid search category");
    return;
  }

  const query =
    "SELECT * FROM demande WHERE ?? LIKE ? ORDER BY dateEnregistrement DESC";

  db.query(query, [searchCategorie, `%${searchInput}%`], (err, results) => {
    if (err) {
      console.error(
        "Error fetching filtered data from the database: " + err.stack
      );
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(results);
  });
});
app.post("/mes_demandes/rechercheFacture", (req, res) => {
  const searchInput = req.body.searchInput;

  const query =
    "SELECT * FROM facture WHERE nomClient LIKE ? ORDER BY dateEnregistrement DESC";

  db.query(query, [`%${searchInput}%`], (err, results) => {
    if (err) {
      console.error(
        "Error fetching filtered data from the database: " + err.stack
      );
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
