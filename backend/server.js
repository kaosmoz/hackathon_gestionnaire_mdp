import 'dotenv/config' ;
import app from "./app.js" ;
import db from "../backend/1_config/db.js"; 
import './1_config/mailer.js';



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Le serveur tourne sur http://localhost:${PORT}`)) ;



/**
 * server.js – Démarrage du serveur
 *
 * 1. Import :
 *    - `app` : instance Express importée depuis `app.js`.
 *    - `dotenv/config` : charge automatiquement les variables d'environnement depuis `.env`.
 *
 * 2. Configuration du port :
 *    - `process.env.PORT` : permet de définir le port via les variables d'environnement.
 *    - Fallback à `3000` si aucune variable n’est définie.
 *
 * 3. Démarrage du serveur :
 *    - `app.listen(PORT, ...)` : lance le serveur Express.
 *    - Callback pour loguer l’URL sur laquelle le serveur est accessible.
 *
 * Résumé :
 * Ce fichier sert de point d’entrée final pour démarrer l’API.
 * Il importe l’app configurée avec toutes les routes et middlewares, et l’expose sur le port défini.
 */
