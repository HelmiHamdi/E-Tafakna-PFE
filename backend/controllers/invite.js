import { db } from "../connect.js";

export const getInvite = (req, res) => {
  const loyerId = req.params.id; // Utilisez req.params.id pour obtenir l'ID du loyer depuis le corps de la requête
  const q = `
        SELECT *
        FROM invite
        WHERE sender = ? OR receiver = ?`;

  db.query(q, [loyerId, loyerId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const sendInvite = (req, res) => {
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
      "INSERT INTO invite(`sender`, `receiver`, `isAccepted`, `createdAt`) VALUES (?, ?, ?, ?)";
    const values = [req.body.sender, req.body.receiver, false, new Date()];
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      // Envoyer une notification
      const notificationMessage = `New invite from ${req.body.sender}`;
      req.io.emit("notification", { sender: req.body.sender, receiver: req.body.receiver, message: notificationMessage });
      return res.status(200).json("Invitation sent.");
    });
  });
};

export const acceptInvitation = (req, res) => {
  const q = "UPDATE invite SET isAccepted=? WHERE id=? ";

  db.query(q, [true, req.params.id], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("Updated!");
    return res.status(403).json("You can update only your invitation");
  });
};
export const refusInvitation = (req, res) => {
  const inviteId = req.params.id; // Assurez-vous que l'ID est bien récupéré des paramètres de la requête

  if (!inviteId) {
    return res.status(400).json({ error: "Invitation ID is required" });
  }

  const q = "DELETE FROM invite WHERE id = ?";

  db.query(q, [inviteId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data.affectedRows > 0) {
      return res.json({ message: "Invitation has been deleted!" });
    } else {
      return res.status(404).json({ error: "Invitation not found or you are not authorized to delete it" });
    }
  });
};