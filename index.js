const express = require("express");
const ejs = require("ejs");
const db = require("./utils/database");

const PORT = 3309;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("accueil", { activePage: "accueil" });
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
  db.query("SELECT * FROM demande", (err, results) => {
    if (err) {
      console.error("Error fetching data from the database: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.render("mes_demandes", { data: results, activePage: "mes_demandes" });
  });
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
        return res.redirect('/success');
    });
});


app.get("/success", (req, res) => {
  res.send("Form submitted successfully!");
});



app.listen(PORT, () => {
  console.log("Server up and running on Port " + PORT);
});
