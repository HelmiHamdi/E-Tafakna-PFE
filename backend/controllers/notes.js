import { db } from "../connect.js";
import moment from "moment";

export const addNotes = (req, res) => {
  // Vérifier si l'ID du loyer existe dans la table des loyers
  const { idLoyer } = req.body;
  const checkQuery = "SELECT * FROM loyers WHERE id = ?";
  db.query(checkQuery, [idLoyer], (err, result) => {
    if (err) return res.status(500).json(err);

    // Si aucun loyer avec cet ID n'est trouvé, renvoyer une erreur
    if (result.length === 0) {
      return res.status(400).json("Loyer not found");
    }

    // Insérer la note dans la base de données
    const insertQuery =
      "INSERT INTO notes(`title`, `body`, `lastModified`, `idLoyer`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.title,
      req.body.body,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      idLoyer,
    ];
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Notes has been created.");
    });
  });
};
export const getNotes = (req, res) => {
  const q = `SELECT * FROM notes `;

  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getNoteByLoyer = (req, res) => {
  
  const { idLoyer } = req.body;
  console.log(idLoyer,"idLoyer");

  try {
    const q = `
    SELECT n.id,n.title, n.body, n.lastModified , n.idLoyer
    FROM notes n 
    JOIN loyers l ON n.idLoyer = l.id 
    WHERE n.idLoyer = ? 
`;

    db.query(q, [idLoyer], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteNotes = (req, res) => {
  const commentId = req.body.id;
  const q = "DELETE FROM notes WHERE `id` = ?";

  db.query(q, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("note has been deleted!");
    return res.status(403).json("You can delete only your note!");
  });
};
export const updateNotes = (req, res) => {
  const q = "UPDATE notes SET title=?,body=?,lastModified=? WHERE id=? ";

  db.query(
    q,
    [
      req.body.title,
      req.body.body,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.id,
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your Notes");
    }
  );
};
