import jwt from "jsonwebtoken";

// Middleware pour vérifier le token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
    next(); // Appeler next() pour passer au middleware suivant ou à la route
  });
};
