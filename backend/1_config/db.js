import mysql from "mysql2/promise" ;
import "dotenv/config" ;

const env = process.env ;

let db ;

async function initDB() {
  try {

    db = mysql.createPool({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,

    }) ;

    await db.getConnection() ;
    console.log(`Connexion à la base de données ${env.DB_NAME} réussie :)`) ;

  } catch (error) {

    console.error("Erreur lors de la connexion à la base de données:", error.message) ;
    process.exit(1) ;

  }
}

await initDB() ; 

export default db ;

/*

 * db.js – Gestion de la connexion à la base de données
 *
 * 1. Import des dépendances :
 *    - `mysql2/promise` : pour pouvoir utiliser MySQL avec des Promises et async/await.
 *    - `dotenv/config` : pour charger automatiquement les variables d'environnement depuis `.env`.
 *
 * 2. Récupération des variables d'environnement :
 *    - `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` pour sécuriser nos credentials.
 *
 * 3. Création d'une pool de connexions :
 *    - `mysql.createPool(...)` permet de gérer plusieurs connexions simultanées.
 *    - Plus performant qu'une connexion unique pour les apps web.
 *
 * 4. Test de la connexion :
 *    - `await db.getConnection()` vérifie que la base est bien accessible dès le lancement.
 *    - Si erreur, log détaillé et arrêt du process (`process.exit(1)`).

*/