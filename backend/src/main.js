var mariadb = require("mariadb");
var express = require("express");
var bodyParser = require("body-parser");

const pool = mariadb.createPool({
  host: "localhost", //  mettre url de connexion ici
  user: "root",
  database: "projetfsjs",
  port: 3308,
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
    `INSERT INTO utilisateur (id_utilisateur, mdp_utilisateur, mail_utilisateur, token_utilisateur) value (?, ?, ?, ?)`,
    [
      utilisateur.id_utilisateur,
      utilisateur.mdp_utilisateur,
      utilisateur.mail_utilisateur,
      utilisateur.token_utilisateur,
    ]
  );
  res.end();
  conn.end();
});

app.get("/utilisateurs/:mail_utilisateur", async (req, res) => {
  const mail_utilisateur = req.params.mail_utilisateur;
  const conn = await pool.getConnection();
  const queryResult = await conn.query(
    `select * from utilisateur where mail_utilisateur = ?`,
    [mail_utilisateur]
  );

  res.json(queryResult);
  res.end();
  conn.end();
});

app.delete("/utilisateur/:id_utilisateur", async (req, res) => {
  const id_utilisateur = req.params.id_utilisateur;
  if (id_utilisateur != -1) {
    const conn = await pool.getConnection();
    const queryResult = await conn.query(
      `delete from utilisateur where id_utilisateur = ?`,
      [id_utilisateur]
    );
    conn.end();
  } else {
    res.status(400);
  }
  res.end();
});

app.put("/utilisateur", async (req, res) => {
  const utilisateur = req.body;
  if (utilisateur.id_utilisateur != -1) {
    const conn = await pool.getConnection();
    const queryResult = await conn.query(
      `update utilisateur set id_utilisateur = ?, mdp_utilisateur = ?, mail_utilisateur = ?, token_utilisateur = ? where id_utilisateur = ? `,
      [
        utilisateur.id_utilisateur,
        utilisateur.mdp_utilisateur,
        utilisateur.mail_utilisateur,
        utilisateur.token_utilisateur,
        utilisateur.id_utilisateur,
      ]
    );
    conn.end();
  } else {
    res.status(400);
  }

  res.end();
});

app.listen(3000);
