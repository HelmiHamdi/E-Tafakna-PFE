import { db } from "../connect.js";

export const getMyMessage = (req, res) => {
  const loyerId = req.params.id; // Utilisez req.params.id pour obtenir l'ID du loyer depuis le corps de la requête
  const q = `
        SELECT *
        FROM chat
        WHERE sender = ? OR receiver = ?`;

  db.query(q, [loyerId, loyerId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const sendMessage = (req, res) => {
  // Vérifier si l'ID du loyer existe dans la table des loyers

  const checkQuery = "SELECT * FROM loyers WHERE id = ?";
  db.query(checkQuery, [req.body.sender], (err, result) => {
    if (err) return res.status(500).json(err);

    // Si aucun loyer avec cet ID n'est trouvé, renvoyer une erreur
    if (result.length === 0) {
      return res.status(400).json("Loyer not found");
    }

    // Insérer la note dans la base de données
    const insertQuery =
      "INSERT INTO chat(`sender`, `receiver`, `message`, `createdAt`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.sender,
      req.body.receiver,
      req.body.message,
      new Date(),
    ];
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      const notificationMessage = `New message from ${req.body.sender}`;
      req.io.emit("notification", { sender: req.body.sender, receiver: req.body.receiver, message: notificationMessage });
     
      return res.status(200).json("Message sent.");
    });
  });
};
