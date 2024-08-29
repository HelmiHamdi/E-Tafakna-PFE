import { db } from "../connect.js";

export const getUser = (req, res) => {
  const {id} = req.body;
  const q =
    "SELECT * FROM users WHERE id=?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) {
      return res.status(504).json("Loyer not found");
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getUsers = (req, res) => {;
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
console.log(err);

    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};


export const deleteUser = (req, res) => {
  const commentId = req.body.id;
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("Profile has been deleted!");
    return res.status(403).json("You can delete only your profile!");
  });
};
