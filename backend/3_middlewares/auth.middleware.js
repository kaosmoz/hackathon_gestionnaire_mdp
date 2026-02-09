import jwt from 'jsonwebtoken' ;
import 'dotenv/config' ;


export const authMiddleware = (req, res, next) => {
  
  const authHeader = req.headers.authorization ;

  if (!authHeader) return res.status(401).json({ message: " Token manquant " }) ;

  const token = authHeader.split(" ")[1] ;

  try {

    req.user = jwt.verify(token, process.env.JWT_SECRET) ;

    next() ;

  } catch (error) {
    return res.status(403).json({ message: "Token invalide" }) ;
  }
} ;

export const authorize = (roles=[]) => (req, res, next) => {

    if(!roles.includes(req.user.role)) return res.status(403).json({message: "Accès intedit "})

    next() ;    
} ;

/**
 * auth.middleware.js – Middleware d’authentification et d’autorisation
 *
 * 1. Import :
 *    - `jsonwebtoken` : pour créer, vérifier et décoder les JWT.
 *    - `dotenv/config` : pour charger les variables d'environnement (.env) (ici JWT_SECRET).
 *
 * 2. authMiddleware(req, res, next) :
 *    - Vérifie la présence d’un token JWT dans `Authorization` header.
 *    - Format attendu : "Bearer <token>".
 *    - Décodage du token avec `jwt.verify(token, JWT_SECRET)` :
 *        • Si valide, stocke les infos utilisateur dans `req.user`.
 *        • Si absent ou invalide, renvoie 401 ou 403 avec un message d’erreur.
 *    - Appel de `next()` si tout est ok pour passer au middleware suivant.
 *
 * 3. authorize(roles=[]) :
 *    - Middleware d’autorisation basé sur les rôles.
 *    - Vérifie que le rôle de l’utilisateur (`req.user.role`) est inclus dans les rôles autorisés.
 *    - Si non autorisé, renvoie 403 avec message "Accès interdit".
 *    - Sinon, passe au middleware suivant.
 *
 * Résumé :
 * Ces middlewares sécurisent les routes :
 * - `authMiddleware` s’assure que l’utilisateur est authentifié via JWT.
 * - `authorize` s’assure qu’il a les droits nécessaires selon son rôle.
 * Ils sont modulaires et réutilisables sur toutes les routes protégées.
 */
