import  db  from '../1_config/db.js' ;

export const createUser = async (
  email,
  passwordHash,
  verifyToken,
  role = "USER" ) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password_hash, verify_token, role) VALUES (?, ? , ? , ? )",
    [email, passwordHash, verifyToken, role]) ;

  return result.insertId ;

};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]) ;

  return rows[0] ;
} ;

export const findUserByVerifyToken = async (token) => {
  const [rows] = await db.query("SELECT * FROM users WHERE verify_token = ?", [token]) ;

  return rows[0] ;

} ;

export const verifyUser = async (userId) => {
  await db.query('UPDATE users SET is_verified=1, verify_token=NULL WHERE id = ?', [userId]) ;
} ;

export const updatePassword = async (userId, passwordHash) => {
  await db.query('UPDATE users SET password_hash=? WHERE id = ?', [passwordHash, userId]) ;
  
} ;

export const saveResetPassword = async (userId, token ) => {
    await db.query('UPDATE users SET reset_token=? WHERE id = ? ', [token , userId]) ;
} ;

export const findUserByResetToken = async (token) => {

  const [rows] = await db.query('SELECT * FROM users WHERE reset_token=?', [token]) ;

  return rows[0] ;
  
} ;

/*
 * users.model.js – Gestion des opérations CRUD sur la table `users`
 *
 * 1. Import :
 *    - `db` : pool de connexions MySQL importé depuis `db.js`.
 *      Permet d’exécuter des requêtes SQL sécurisées avec async/await.
 *
 * 2. createUser(email, passwordHash, verifyToken, role="USER") :
 *    - Insère un nouvel utilisateur dans la base (`INSERT INTO users ...`).
 *    - Utilise des placeholders `?` pour éviter les injections SQL.
 *    - Retourne l’ID de l’utilisateur créé (`insertId`).
 *
 * 3. findUserByEmail(email) :
 *    - Récupère un utilisateur via son email (`SELECT * FROM users WHERE email = ?`).
 *    - Retourne le premier résultat trouvé.
 *
 * 4. findUserByVerifyToken(token) :
 *    - Récupère un utilisateur via son token de vérification.
 *    - Utile pour la validation du compte lors de l’inscription.
 *
 * 5. verifyUser(userId) :
 *    - Met à jour un utilisateur pour le marquer comme vérifié (`is_verified = 1`) et supprime le token.
 *
 * 6. updatePassword(userId, passwordHash) :
 *    - Modifie le mot de passe hashé d’un utilisateur.
 *
 * 7. saveResetPassword(userId, token) :
 *    - Stocke un token temporaire pour la réinitialisation de mot de passe.
 *
 * 8. findUserByResetToken(token) :
 *    - Récupère un utilisateur via son token de réinitialisation.
 *
 * Résumé :
 * Ce fichier centralise toute la logique CRUD des utilisateurs.
 * Il sécurise les requêtes avec des placeholders, gère l’inscription, la vérification
 * et la réinitialisation de mot de passe.
 
 */
