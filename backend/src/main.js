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

app.post("/utilisateur", async (req, res) => {
  const utilisateur = req.body;
  const conn = await pool.getConnection();
  const queryResult = await conn.query(
    `INSERT INTO utilisateur (idutilisateur, mdp_utilisateur, mail_utilisateur) value (?, ?, ?)`,
    [
      utilisateur.idutilisateur,
      utilisateur.mdp_utilisateur,
      utilisateur.mail_utilisateur,
    ]
  );
  console.log(queryResult); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  res.end();
  conn.end();
});

app.get("/utilisateurs/:idutilisateur", async (req, res) => {
  const idutilisateur = req.params.idutilisateur;
  const index = utilisateur.findIndex((p) => p.idutilisateur === idutilisateur);
  const conn = await pool.getConnection();
  const queryResult = await conn.query(
    `select  (idutilisateur, mdp_utilisateur, mail_utilisateur) from utilisateur where idutilisateur = ?`,
    [index.idutilisateur]
  );

  res.json(queryResult);
  res.end();
  conn.end();
});

app.delete("/utilisateur/:idutilisateur", async (req, res) => {
  const idutilisateur = req.params.idutilisateur;
  const index = utilisateur.findIndex((p) => p.idutilisateur === idutilisateur);
  if (index != -1) {
    const conn = await pool.getConnection();
    const queryResult = await conn.query(
      `delete from utilisateur where idutilisateur = ?`,
      [utilisateur.idutilisateur]
    );
  } else {
    res.status(400);
  }
  conn.end();
  res.end();
});

app.put("/utilisateur", async (req, res) => {
  const utilisateur = req.body;
  const index = utilisateur.findIndex(
    (p) => p.idutilisateur === utilisateur.idutilisateur
  );
  if (index != -1) {
    const conn = await pool.getConnection();
    const queryResult = await conn.query(
      `update utilisateur set idutilisateur = ?, mdp_utilisateur = ?, mail_utilisateur = ? where idutilisateur = ? `,
      [
        utilisateur.mdp_utilisateur,
        utilisateur.mail_utilisateur,
        utilisateur.idutilisateur,
      ]
    );
  } else {
    res.status(400);
  }
  conn.end();
  res.end();
});

app.listen(3000);
