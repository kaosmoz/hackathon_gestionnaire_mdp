import nodemailer from 'nodemailer' ;
import 'dotenv/config' ;


export const transporter = nodemailer.createTransport({

  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS

  } 

}) ;

transporter.verify((err, success) => {
  if (err) console.error("Erreur SMTP ", err.message)
    else console.log('SMTP messagerie online')
 
}) ;

/*
 * mailer.js – Configuration et vérification de la messagerie SMTP
 *
 * 1. Import des dépendances :
 *    - `nodemailer` : bibliothèque pour envoyer des emails depuis Node.js.
 *    - `dotenv/config` : pour charger automatiquement les variables d'environnement depuis `.env`.
 *
 * 2. Création du transporter SMTP :
 *    - `nodemailer.createTransport({...})` configure la connexion au serveur SMTP.
 *    - Paramètres :
 *        • `host` et `port` : récupérés depuis les variables d'environnement pour flexibilité.
 *        • `secure` : false ici car le port n’utilise pas TLS/SSL (adapter selon le serveur).
 *        • `auth` : identifiants SMTP (user/pass) sécurisés via les variables d'environnement.
 *
 * 3. Vérification de la connexion SMTP :
 *    - `transporter.verify((err, success) => {...})` teste la configuration au démarrage.
 *    - Log d'erreur détaillé si le serveur n'est pas joignable.
 *    - Log "SMTP messagerie online" si tout fonctionne.
 *
 */