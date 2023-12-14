const express = require("express");
const ejs = require("ejs");
const db = require("./utils/database");
const resultatsRapports = require("./utils/resultats_rapports");
const fs = require("fs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const width = 400; //px
const height = 400; //px
const backgroundColour = "white"; 
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour,
});

const configuration = {
  type: "line", 
  data: {
    labels: [2018, 2019, 2020, 2021],
    datasets: [
      {
        label: "Sample 1",
        data: [10, 15, -20, 15],
        fill: false,
        borderColor: ["rgb(51, 204, 204)"],
        borderWidth: 1,
        xAxisID: "xAxis1", 
      },
      {
        label: "Sample 2",
        data: [10, 30, 20, 10],
        fill: false,
        borderColor: ["rgb(255, 102, 255)"],
        borderWidth: 1,
        xAxisID: "xAxis1",
      },
    ],
  },
  options: {
    scales: {
      y: {
        suggestedMin: 0,
      },
    },
  },
};

const PORT = 3309;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const totalRows = await resultatsRapports.assignTotalRows();
    const whatsappRows = await resultatsRapports.assignWhatsappRows();
    const messengerRows = await resultatsRapports.assignMessengerRows();
    const instagramRows = await resultatsRapports.assignInstagramRows();
    const siteRows = await resultatsRapports.assignSiteRows();
    const landingRows = await resultatsRapports.assignLandingRows();
    const baORows = await resultatsRapports.assignBaORows();
    const nullSourcesRows = await resultatsRapports.assignNullSourceRows();

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

//Rapports
app.get("/mes_demandes/whatsappRowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS whatsappRowCount FROM demande WHERE source = 'Whatsapp'";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const whatsappRowCount = result[0].whatsappRowCount;
    res.json({ whatsappRowCount });
  });
});

app.get("/mes_demandes/instagramRowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS instagramRowCount FROM demande WHERE source = 'Instagram'";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const instagramRowCount = result[0].instagramRowCount;
    res.json({ instagramRowCount });
  });
});

app.get("/mes_demandes/messengerRowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS messengerRowCount FROM demande WHERE source = 'Messenger'";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const messengerRowCount = result[0].messengerRowCount;
    console.log("messenger : "+messengerRowCount);
    res.json({ messengerRowCount });
  });
});
app.get("/mes_demandes/ndRowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS ndRowCount FROM demande WHERE source is NULL";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const ndRowCount = result[0].ndRowCount;
    res.json({ ndRowCount });
  });
});
app.get("/mes_demandes/siteRowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS siteRowCount FROM demande WHERE source = 'site'";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const siteRowCount = result[0].siteRowCount;
    res.json({ siteRowCount });
  });
});
app.get("/mes_demandes/landingRowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS landingRowCount FROM demande WHERE source = 'landing'";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const landingRowCount = result[0].landingRowCount;
    res.json({ landingRowCount });
  });
});
app.get("/mes_demandes/baORowCount", (req, res) => {
  const getCountQuery =
    "SELECT COUNT(*) AS baORowCount FROM demande WHERE source = 'Bouche à Oreil'";

  db.query(getCountQuery, (err, result) => {
    if (err) {
      console.error("Error fetching row count: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const baORowCount = result[0].baORowCount;
    res.json({ baORowCount });
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
