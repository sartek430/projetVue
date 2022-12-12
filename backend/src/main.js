var mariadb = require("mariadb");
var express = require("express");
var bodyParser = require("body-parser");

const pool = mariadb.createPool({
  host: "localhost", //  mettre url de connexion ici
  user: "root",
  password: "H.v59430",
  database: "projetfsjs",
  port: 3306,
  connectionLimit: 5,
});

var app = express();

app.use(bodyParser.json());

app.use("/", express.static("public"));

//get tous les utilisateurs
app.get("/utilisateurs", async (req, res) => {
  const conn = await pool.getConnection();
  const utilisateurs = await conn.query("SELECT * FROM utilisateur");
  res.json(utilisateurs);
  conn.end();
});

//get un utilisateur par id passé en paramètre
app.get("/utilisateur/:id", async (req, res) => {
  const utilisateur = req.params.name;
  const index = utilisateurs.findIndex(
    (p) => p.idutilisateur === idutilisateur
  );
  console.log(utilisateur);
  const conn = await pool.getConnection();
  const queryResult = await conn.query(
    "SELECT idutilisateur, nom_utilisateur, mdp_utilisateur, mail_utilisateur FROM utilisateur where idutilisateur = ?",
    [utilisateur.idutilisateur]
  );
  res.json(utilisateur);
  console.log(queryResult);
  res.end();
  conn.end();
});

app.listen(3000);
