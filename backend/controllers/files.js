import { db } from "../connect.js";
import multer from "multer";
import path from "path";

// Configurer multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage })

export const uploadFile = upload.single('file');

export const handleUpload = (req, res) => {
  if (!req.file) return res.status(400).json("No file uploaded.");

  const filePath = `/uploads/${req.file.filename}`;

  const insertQuery = "INSERT INTO files(`fileName`, `folderPath`, `fileType`, `fileContent`, `idLoyer`, `upload`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.file.originalname,
    req.body.folderPath,
    "upload",
    "",
    req.body.idLoyer,
    filePath
  ];

  db.query(insertQuery, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("File has been uploaded and saved.");
  });
};

export const addFiles = (req, res) => {
  // Vérifier si l'ID du loyer existe dans la table des loyers
  const { idLoyer } = req.body;
console.log(req.body)
  const checkQuery = "SELECT * FROM loyers WHERE id = ?";
  db.query(checkQuery, [idLoyer], (err, result) => {
    if (err) return res.status(500).json(err);

    // Si aucun loyer avec cet ID n'est trouvé, renvoyer une erreur
    if (result.length === 0) {
      return res.status(400).json("Loyer not found");
    }

    // Insérer la note dans la base de données
    const insertQuery =
      "INSERT INTO files(`fileName`, `folderPath`, `fileType`, `fileContent`,`idLoyer`) VALUES (?, ?, ?, ?,?)";
    const values = [
      req.body.fileName,
      req.body.folderPath,
      req.body.fileType,
      req.body.fileContent,
      idLoyer,
    ];
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("File has been created.");
    });
  });
};
export const getFiles = (req, res) => {
  const q = `SELECT * FROM files `;

  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFilesByLoyer = (req, res) => {
  const loyerId = req.params.id; // Utilisez req.params.id pour obtenir l'ID du loyer depuis le corps de la requête
  const q = `
        SELECT *
        FROM files f 
        WHERE f.idLoyer = ? `;

  db.query(q, [loyerId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteFiles = (req, res) => {
  const Id = req.body.id;
  const q = "DELETE FROM files WHERE `id` = ?";

  db.query(q, [Id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("file has been deleted!");
    return res.status(403).json("You can delete only your file!");
  });
};

export const updateFiles = (req, res) => {
  const q =
    "UPDATE files SET fileName=?, fileType=?, folderPath=?,fileContent=? WHERE id=? ";
  
 

  db.query(
    q,
    [
      req.body.fileName,
      req.body.fileType,
      req.body.folderPath,
      req.body.fileContent,
      req.body.id,
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your Notes");
    }
  );
};
