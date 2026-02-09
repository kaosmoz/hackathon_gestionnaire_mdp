import express from 'express' ;
import 'dotenv/config' ;



const app = express() ;

app.use(express.json()) ;






export default app ;

/**
 * app.js – Point d’entrée de l’application Express
 *
 * 1. Import :
 *    - `express` : framework Node.js pour créer le serveur et les routes.
 *    - `authRoutes` : routes liées à l’authentification (import depuis auth.routes.js).
 *    - `dotenv/config` : charge automatiquement les variables d’environnement depuis `.env`.
 *
 * 2. Initialisation :
 *    - `const app = express()` : crée l’instance Express.
 *    - `app.use(express.json())` : middleware global pour parser le JSON dans les requêtes.
 *
 * 3. Routes principales :
 *    - `/api/auth` : branche toutes les routes d’authentification (register, login, verify, reset password).
 *    - `/` : route racine pour tester que l’API fonctionne, retourne un message simple.
 *
 * 4. Export :
 *    - `export default app` : permet d’importer l’app dans le serveur principal (`server.js` ou `index.js`) et démarrer l’API.
 *
 * Résumé :
 * Ce fichier configure le serveur Express et centralise l’inclusion des routes principales.
 * Il sert de point d’entrée pour l’application.
 */
