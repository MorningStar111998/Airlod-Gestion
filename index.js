const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const db = require("./utils/database");
const resultatsRapports = require("./utils/resultats_rapports");
const passport = require("passport");
const PORT = process.env.PORT || 3309;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Hardcoded users
const users = [
  {
    id: 1,
    username: "imane2023",
    firstName: "Imane",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password1",
  },
  {
    id: 2,
    username: "user2",
    firstName: "Mohamed",
    lastName: "Mokhtari",
    email: "jane.doe@example.com",
    password: "password2",
  },
  {
    id: 3,
    username: "user3",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    password: "password3",
  },
  {
    id: 4,
    username: "Administrator",
    firstName: "Regis",
    lastName: "TOUGOURI",
    email: "reigs@example.com",
    password: "itPassword",
  },
];

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.userId && req.session.userFirstName) {
    return next();
  }
  res.redirect("/");
};

// Routes
app.get("/", (req, res) => {
  res.render("login"); // Render the login.ejs file
});

app.post("/login",  (req, res) => {
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

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});



app.get("/accueil", isAuthenticated, (req, res) => {
  res.render("accueil", {
    activePage: "accueil",
    firstName: req.session.userFirstName,
  });
});

app.get("/ajouter_demande", (req, res) => {
  const getMaxNumDemandeQuery =
    "SELECT MAX(numDemande) AS maxNumDemande FROM demande";
  db.query(getMaxNumDemandeQuery, (err, result) => {
    if (err) {
      console.error("Error fetching max numDemande from the database: " + err);
      return res.status(500).send("Internal Server Error");
    }

    const numDemande =
      result[0].maxNumDemande !== null ? result[0].maxNumDemande + 1 : 1;

    // Render the form and pass the numDemande to EJS
    res.render("ajouter_demande", {
      activePage: "ajouter_demande",
      firstName: req.session.userFirstName,
      nextNumDemande: numDemande,
    });
  });
});

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
      nullSourcesData : nullSourcesRows,
    };
    console.log(combinedData);
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/mes_demandes", (req, res) => {
  db.query(
    "SELECT * FROM demande ORDER BY dateEnregistrement DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching data from the database: " + err.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Convert the database results to a JavaScript array
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

      // console.log(dataArray);

      res.render("mes_demandes", {
        data: dataArray,
        activePage: "mes_demandes",
        firstName: req.session.userFirstName,
      });
    }
  );
});

app.get("/ajouter_produit", (req, res) => {
  res.render("ajouter_produit", {
    activePage: "ajouter_produit",
    firstName: req.session.userFirstName,
  });
});

app.get("/mon_stock", (req, res) => {
  res.render("mon_stock", {
    activePage: "mon_stock",
    firstName: req.session.userFirstName,
  });
});

app.get("/ramassage", (req, res) => {
  res.render("ramassage", {
    activePage: "ramassage",
    firstName: req.session.userFirstName,
  });
});

app.get("/reclamation", (req, res) => {
  res.render("reclamation", {
    activePage: "reclamation",
    firstName: req.session.userFirstName,
  });
});

app.get("/factures", (req, res) => {
  res.render("factures", {
    activePage: "factures",
    firstName: req.session.userFirstName,
  });
});

app.get("/retour", (req, res) => {
  res.render("retour", {
    activePage: "retour",
    firstName: req.session.userFirstName,
  });
});



//POST handlers
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

  // Use the extracted form data to insert into the database
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

  // Get the next available numDemande from the request body
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
    // Redirect to a success page or handle as needed
    return res.redirect("/mes_demandes");
  });
});

// app.post("/ajouter_demande", (req, res) => {
//   const {
//     demande,
//     destinataire,
//     telephone,
//     email,
//     ville,
//     adresse,
//     typeClient,
//     source,
//     etape,
//     etatClient,
//     facture,
//     produit,
//     prix,
//     quantite,
//     paiement,
//     description,
//     remarque,
//   } = req.body;

//   // Use the extracted form data to insert into the database
//   const insertQuery = `
//         INSERT INTO demande (
//             numDemande,
//             nomClient,
//             numTelephone,
//             email,
//             ville,
//             adresse,
//             typeClient,
//             source,
//             etapeActuelle,
//             etatClient,
//             numFacture,
//             produit,
//             prix,
//             quantite,
//             typePaiement,
//             description,
//             remarque
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   // Get the next available numDemande from the request body
//   const nextNumDemande = req.body.nextNumDemande;

//   const values = [
//     nextNumDemande,
//     destinataire,
//     telephone,
//     email,
//     ville,
//     adresse,
//     typeClient,
//     source,
//     etape,
//     etatClient,
//     facture,
//     produit,
//     prix,
//     quantite,
//     paiement,
//     description,
//     remarque,
//   ];

//   db.query(insertQuery, values, (err, result) => {
//     if (err) {
//       console.error("Error inserting data into the database: " + err);
//       return res.status(500).send("Internal Server Error");
//     }

//     console.log("Data inserted into the database successfully!");
//     // Redirect to a success page or handle as needed
//     return res.redirect("/mes_demandes");
//   });
// });

// Updated route to handle typeClient filter
app.post("/mes_demandes/filterTypeClient", (req, res) => {
  const selectedTypeClient = req.body.typeClient;

  // Modify your database query to filter by typeClient
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

  // Modify your database query to filter by EtapeActuelle
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

  // Modify your database query to filter by source
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

  // Modify your database query to filter by etatClient
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
    // Handle invalid input, possibly return an error response
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

app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
