const express = require("express");
const ejs = require("ejs");
const db = require("./utils/database");
const resultatsRapports = require("./utils/resultats_rapports");

const PORT = 3309;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    // Call functions from the imported module "resultatsRapports" to get the results
    const totalRows = await resultatsRapports.assignTotalRows();
    const whatsappRows = await resultatsRapports.assignWhatsappRows();
    const messengerRows = await resultatsRapports.assignMessengerRows();
    const instagramRows = await resultatsRapports.assignInstagramRows();
    const siteRows = await resultatsRapports.assignSiteRows();
    const landingRows = await resultatsRapports.assignLandingRows();
    const baORows = await resultatsRapports.assignBaORows();
    const nullSourcesRows = await resultatsRapports.assignNullSourceRows();


    console.log(whatsappRows);

    res.render("accueil", {
      totalRows: totalRows,
      whatsappRows: whatsappRows,
      instagramRows: instagramRows,
      messengerRows: messengerRows,
      landingRows: landingRows,
      siteRows: siteRows,
      baORows: baORows,
      nullRows: nullSourcesRows,
      activePage: "accueil",
    });

  } catch (err) {
    console.error("Error fetching data: " + err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/", (req, res) => {
//   const getTotalRowsQuery = "SELECT COUNT(*) AS totalRows FROM demande";
//   db.query(getTotalRowsQuery, (err, totalRowsResult) => {
//     if (err) {
//       console.error("Error fetching total rows: " + err);
//       return res.status(500).send("Internal Server Error");
//     }

//     const totalRows = totalRowsResult[0].totalRows;
//     res.render("accueil", { activePage: "accueil",totalRows:totalRows });
//   });
// });

app.get("/ajouter_demande", (req, res) => {
  // Query the database to get the next available numDemande
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
      nextNumDemande: numDemande,
    });
  });
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

      console.log(dataArray);

      res.render("mes_demandes", {
        data: dataArray,
        activePage: "mes_demandes",
      });
    }
  );
});

app.get("/ajouter_produit", (req, res) => {
  res.render("ajouter_produit", { activePage: "ajouter_produit" });
});

app.get("/mon_stock", (req, res) => {
  res.render("mon_stock", { activePage: "mon_stock" });
});

app.get("/ramassage", (req, res) => {
  res.render("ramassage", { activePage: "ramassage" });
});

app.get("/reclamation", (req, res) => {
  res.render("reclamation", { activePage: "reclamation" });
});

app.get("/factures", (req, res) => {
  res.render("factures", { activePage: "factures" });
});

app.get("/retour", (req, res) => {
  res.render("retour", { activePage: "retour" });
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
