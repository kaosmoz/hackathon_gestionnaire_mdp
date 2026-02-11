import { z } from 'zod' ;

export const validateRegister = (req, res, next) => {

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)

  }) ;

  try {

    schema.parse(req.body) ;

    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: `Les mots de passe ne correspondent pas ` });
    }

    next();

  } catch (e) {
    return res.status(400).json({ message: e.errors.map( err => err.message).join(" , ") }) ;
  }
} ;

export const validateLogin = (req, res, next) => {

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6)

  }) ;

  try {
    schema.parse(req.body) ;

    next();

  } catch (e) {

    return res
      .status(400)
      .json({ message: e.errors.map((err) => err.message).join(", ") }) ;
  }
} ;



/**
 * validators.middleware.js – Validation des données d’entrée pour l’authentification
 *
 * 1. Import :
 *    - `zod` : bibliothèque de validation de schémas pour Node.js.
 *      Permet de définir des règles strictes et de gérer facilement les erreurs.
 *
 * 2. validateRegister(req, res, next) :
 *    - Schéma `z.object({...})` pour vérifier :
 *        • email : doit être une adresse email valide.
 *        • password : chaîne de caractères avec minimum 6 caractères.
 *        • confirmPassword : idem.
 *    - Vérifie que `password` et `confirmPassword` correspondent.
 *    - Si validation échoue, renvoie 400 avec un message détaillé des erreurs.
 *    - Sinon, appelle `next()` pour passer au middleware suivant.
 *
 * 3. validateLogin(req, res, next) :
 *    - Schéma pour login :
 *        • email : email valide.
 *        • password : chaîne d’au moins 6 caractères.
 *    - Même logique : parse les données et renvoie 400 si invalide, sinon `next()`.
 *
 * Résumé :
 * Ces middlewares centralisent la validation des données côté serveur.
 * Ils sécurisent les routes d’inscription et de connexion en s’assurant que
 * l’input utilisateur respecte les règles attendues avant d’atteindre le contrôleur.
 */
