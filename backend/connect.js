import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"hamdi",
  database: "railway",
})
db.connect(function (err) {

  if (err) throw err;

  console.log('Vous êtes connecté à votre BDD...');

});