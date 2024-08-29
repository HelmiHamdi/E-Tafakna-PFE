import express from "express"; // Importe le module Express pour créer l'application web
import { Server } from "socket.io"; // Importe le module Socket.io pour la communication en temps réel
import http from "http"; // Importe le module HTTP pour créer un serveur
import authRoutes from "./routes/auth.js"; // Importe les routes pour l'authentification
import notesRoutes from "./routes/notes.js"; // Importe les routes pour les notes
import filesRoutes from "./routes/files.js"; // Importe les routes pour les fichiers
import loyersRoutes from "./routes/loyers.js"; // Importe les routes pour les loyers
import linkRoutes from "./routes/linkUserWithLoyer.js"; // Importe les routes pour lier les utilisateurs avec les loyers
import usersRoutes from "./routes/users.js"; // Importe les routes pour les utilisateurs
import chatbotRouter from "./routes/chatbot.js"; // Importe les routes pour le chatbot
import cookieParser from "cookie-parser"; // Importe le module cookie-parser pour parser les cookies
import cors from "cors"; // Importe le module CORS pour les politiques de sécurité cross-origin
import { db } from "./connect.js"; // Importe la connexion à la base de données
import chatRoutes from "./routes/chat.js"; // Importe les routes pour le chat
import inviteRoutes from "./routes/invite.js"; // Importe les routes pour les invitations
import { queries } from "./queries.js"; // Importe les requêtes pour créer les tables de la base de données
import { fileURLToPath } from 'url'; // Importe le module pour travailler avec les URLs de fichier
import path from 'path'; // Importe le module path pour travailler avec les chemins de fichier

const app = express(); // Crée une instance de l'application Express

const server = http.createServer(app); // Crée un serveur HTTP avec l'application Express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Autorise les requêtes depuis ce domaine
    methods: ["GET", "POST"] // Autorise uniquement les méthodes GET et POST
  }
});

app.use((req, res, next) => {
  req.io = io; // Attache l'instance de Socket.io à l'objet req
  next(); // Passe au middleware suivant
});

// Middleware pour définir les en-têtes de réponse
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true); // Autorise les cookies dans les requêtes cross-origin
  next(); // Passe au middleware suivant
});

app.use(express.json()); // Middleware pour parser les requêtes JSON
app.use(
  cors({
    origin: "http://localhost:3000", // Autorise les requêtes depuis ce domaine
  })
);
app.use(cookieParser()); // Middleware pour parser les cookies

// Récupérer le chemin de l'URL du module
const __filename = fileURLToPath(import.meta.url); // Récupère le chemin du fichier actuel

// Récupérer le répertoire parent
const __dirname = path.dirname(__filename); // Récupère le répertoire du fichier actuel

const uploadsPath = path.resolve(__dirname, 'uploads'); // Définit le chemin absolu pour le répertoire 'uploads'
app.use('/uploads', express.static(uploadsPath)); // Sert les fichiers statiques du répertoire 'uploads'

// Définit les routes pour l'authentification
app.use("/api/auth", authRoutes);
// Définit les routes pour les notes
app.use("/api/notes", notesRoutes);
// Définit les routes pour les fichiers
app.use("/api/files", filesRoutes);
// Définit les routes pour le chat
app.use("/api/chat", chatRoutes);
// Définit les routes pour les invitations
app.use("/api/invite", inviteRoutes);
// Définit les routes pour les loyers
app.use("/api/loyers", loyersRoutes);
// Définit les routes pour lier les utilisateurs avec les loyers
app.use("/api/link", linkRoutes);
// Définit les routes pour les utilisateurs
app.use("/api/users", usersRoutes);
// Définit les routes pour le chatbot
app.use("/api/chatIA",chatbotRouter); 

// Démarre le serveur sur le port 8800
app.listen(8800, () => {
  db.connect((err) => { // Connexion à la base de données
    if (err) {
      console.error("Error connecting to the database:", err); // Affiche une erreur si la connexion échoue
      return;
    }
    console.log("Connected to the database!"); // Affiche un message si la connexion réussit

    // Crée les tables de la base de données
    queries.map((query) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error creating table:", err); // Affiche une erreur si la création de table échoue
          return;
        }
        console.log("Table created successfully."); // Affiche un message si la création de table réussit
      });
    });
  });
  console.log("API Working"); // Affiche un message indiquant que l'API fonctionne
});
