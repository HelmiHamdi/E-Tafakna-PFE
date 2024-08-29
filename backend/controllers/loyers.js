import { db } from "../connect.js";

export const getLoyer = (req, res) => {
  const {id} = req.body;
  const q =
    "SELECT * FROM loyers WHERE id=?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) {
      return res.status(504).json("Loyer not found");
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};
export const getLoyerByEmail = (req, res) => {
  const {email} = req.body;
  const q =
    "SELECT * FROM loyers WHERE email=?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) {
      return res.status(504).json("Loyer not found");
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getLoyers = (req, res) => {;
  const q = "SELECT * FROM loyers";

  db.query(q, (err, data) => {
console.log(err);

    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
export const updateLoyer = (req, res) => {

  const q =
    "UPDATE loyers SET name=?,last_names=?,country=?,region=?,addresse=?,phone_Number=?,email=?,role=? WHERE id =? ";
  db.query(
    q,
    [
      req.body.name,
      req.body.last_names,
      req.body.country,
      req.body.region,
      req.body.addresse,
      req.body.phone_Number,
      req.body.email,
      req.body.role,
      req.body.id,
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      if (data?.affectedRows > 0) return res.json("Updated!");
      return res.status(503).json("You can update only your Profile");
    }
  );
};
export const updatePicture = (req, res) => {
  const q =
    "UPDATE loyers SET picture=? WHERE id=? ";
  db.query(
    q,
    [
      req.body.picture,
      req.body.id,
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated picture !");
      return res.status(503).json("You can update only your Picture");
    }
  );
};
export const deleteLoyer = (req, res) => {
  const commentId = req.body.id;
  const q = "DELETE FROM loyers WHERE `id` = ?";

  db.query(q, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("Profile has been deleted!");
    return res.status(403).json("You can delete only your profile!");
  });
};
