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
  res.render("ajouter_demande", { activePage: "ajouter_demande" });
});
