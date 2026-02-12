import express from 'express' ;
import { validateRegister, validateLogin } from '../3_middlewares/validation.middleware.js' ;
import { register, verifyEmail, login } from '../4_controllers/auth.controller.js' ;


const router = express.Router() ;

router.post('/register', validateRegister, register ) ;

router.post('/login', validateLogin, login ) ;

router.get('/verify-email', verifyEmail ) ;

/* router.post('/reset-password-request', resetPasswordRequest ) ;

router.post('/reset-password', resetPassword ) ; */


export default router ;



/**
 * auth.routes.js – Routes liées à l’authentification
 *
 * 1. Import :
 *    - `express` : framework Node.js pour créer des routes et serveurs.
 *    - `validateRegister`, `validateLogin` : middlewares pour valider les données utilisateur.
 *    - `register`, `verifyEmail`, `login`, `resetPasswordRequest`, `resetPassword` :
 *      fonctions contrôleurs qui contiennent la logique métier.
 *
 * 2. Création du router :
 *    - `const router = express.Router()` : objet routeur pour regrouper les routes auth.
 *
 * 3. Définition des routes :
 *    - `POST /register` :
 *        • Middleware `validateRegister` pour sécuriser l’input.
 *        • Contrôleur `register` pour créer l’utilisateur et envoyer un email de vérification.
 *    - `POST /login` :
 *        • Middleware `validateLogin`.
 *        • Contrôleur `login` pour générer un JWT si identifiants corrects.
 *    - `GET /verify` :
 *        • Contrôleur `verifyEmail` pour valider le compte via token.
 *    - `POST /reset-password-request` :
 *        • Contrôleur `resetPasswordRequest` pour générer un token de réinitialisation et envoyer l’email.
 *    - `POST /reset-password` :
 *        • Contrôleur `resetPassword` pour mettre à jour le mot de passe avec le token valide.
 *
 * 4. Export :
 *    - `export default router` : pour utiliser ces routes dans `app.js` ou serveur principal.
 *
 * Résumé :
 * Ce fichier centralise toutes les routes liées à l’authentification.
 * Il applique des middlewares pour valider les inputs et délègue la logique métier aux contrôleurs.
 * Les routes sont prêtes à être branchées sur `/api/auth` ou autre préfixe.
 */

