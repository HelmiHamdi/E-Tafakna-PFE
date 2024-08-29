import { db } from "../connect.js";

export const addLink = (req, res) => {
  // Vérifier si l'ID du loyer existe dans la table des loyers et L'ID du user existe dans la table des users
  const { loyer_id, user_id, email } = req.body;
  const checkQuery1 = "SELECT * FROM loyers WHERE id = ?";
  const checkQuery2 = "SELECT * FROM users WHERE id = ?";
  db.query(checkQuery1, [loyer_id], (err, result1) => {
    if (err) return res.status(500).json(err);

    // Si aucun loyer avec cet ID n'est trouvé, renvoyer une erreur
    if (result1.length === 0) {
      return res.status(400).json("Loyer not found");
    }

    db.query(checkQuery2, [user_id], (err, result2) => {
      if (err) return res.status(500).json(err);

      // Si aucun utilisateur avec cet ID n'est trouvé, renvoyer une erreur
      if (result2.length === 0) {
        return res.status(400).json("User not found");
      }

      // Si un e-mail est spécifié dans la requête, vérifier s'il correspond à l'e-mail de l'utilisateur
      if (email) {
        const userEmail = result2[0].email;
        if (email !== userEmail) {
          return res.status(400).json("Invalid email for the specified user");
        }
      }

      // Utiliser l'e-mail de l'utilisateur s'il n'est pas spécifié dans la requête
      const userEmail = email || result2[0].email;

      // Insérer la ligne dans la table link_user_withloyer
      const insertQuery =
        "INSERT INTO link_user_withloyer(`user_id`, `loyer_id`, `joinMeeting`, `date`, `email`, `answer`, `created_at`, `end_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        user_id,
        loyer_id,
        req.body.joinMeeting,
        req.body.date,
        userEmail,
        req.body.answer,
        req.body.created_at,
        req.body.end_time,
      ];
      db.query(insertQuery, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Link has been created.");
      });
    });
  });
};

export const getLinks = (req, res) => {
  const q = `SELECT * FROM link_user_withloyer`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getLinksByLoyer = (req, res) => {
  const { loyer_id } = req.body;
  try {
    const q = `
       SELECT u.image, u.first_name, u.last_name ,l.date,l.created_at,l.end_time,l.joinMeeting,l.id
       FROM users u
       JOIN link_user_withloyer l ON l.user_id = u.id
       WHERE l.loyer_id = ? and l.delted is not TRUE
     `;
    // const q = "select * from users";
    db.query(q, [loyer_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUsersByCountry = (req, res) => {
  const { loyer_id } = req.body;
  try {
    const q = `
  SELECT u.address,l.id
  FROM users u 
  JOIN link_user_withloyer l ON l.user_id = u.id 
  WHERE l.loyer_id = ?  
`;

    db.query(q, [loyer_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUsersByLoyer = (req, res) => {
  const { loyer_id } = req.body;
  try {
    const q = `
  SELECT u.image, u.first_name, u.last_name ,u.email,u.phone ,u.address,l.id
  FROM users u 
  JOIN link_user_withloyer l ON l.user_id = u.id 
  WHERE l.loyer_id = ? and l.deletedClient is not true 
`;

    db.query(q, [loyer_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteLink = (req, res) => {
  const { id } = req.body;
  try {
    const checkQuery = "SELECT * FROM link_user_withloyer WHERE id = ? and deleted is not true";

    db.query(checkQuery, [id], (err, result) => {
      console.log(result.length === 0);
      if (err) return res.status(500).json(err);
      if (result.length === 0) {
        res.send("no id found");
      }
      const endTime = new Date(result[0].end_time);
      const currentDate = new Date();
      const meetingDate = new Date(result[0].date);
      var x = 1
      // Vérifier si la réunion est terminée
       if (currentDate > endTime || currentDate > meetingDate) {
         const deleteQuery = "DELETE FROM link_user_withloyer WHERE id = ?";
         db.query(deleteQuery, [id], (err, data) => {
           if (err) return res.status(500).json(err);
           if (data.affectedRows > 0) return res.json("Link has been deleted!");
         });
       } else {
         return res
           .send("Link can only be deleted after the meeting or date has passed");
       }
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const checkQuery =
      "SELECT * FROM link_user_withloyer WHERE id = ? and deletedClient is not true";

    db.query(checkQuery, [id], (err, result) => {
      console.log(result.length === 0);
      if (err) return res.status(500).json(err);
      if (result.length === 0) {
        res.send("no id found");
      }
      const deleteQuery =
        "UPDATE link_user_withloyer SET deletedClient = true WHERE id = ?";
      db.query(deleteQuery, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Link has been deleted!");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
