import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './5_routes/auth.routes.js';
import vaultRoutes from "./5_routes/vault.routes.js";
import categoryRoutes from "./5_routes/category.routes.js";


// Initialisation de dotenv pour rendre les variables .env accessibles via process.env
dotenv.config();

// Création de l'instance Express (application principale)
const app = express();


app.use(express.json());

// Activation du CORS pour autoriser les requêtes provenant d'autres domaines
// Indispensable pour une communication frontend ↔ backend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // URL du front Vite
    credentials: true                // autorise les cookies
}));

// Activation de Helmet pour renforcer la sécurité HTTP
// Ajoute automatiquement des headers sécurisés
app.use(helmet());



/**
 * ==========================
 * ROUTES DE L'APPLICATION
 * ==========================
 */

// Routes d'authentification (login, register, etc.)
app.use('/api/auth', authRoutes);

app.use("/api/vaults", vaultRoutes);

app.use("/api/categories", categoryRoutes);


// Export de l'application pour être utilisée dans server.js ou index.js
export default app;
