/**
 * auth.controller.js – Contrôleurs pour l’authentification et la gestion des utilisateurs
 *
 * 1. Imports principaux :
 *    - `argon2` : pour hasher et vérifier les mots de passe.
 *    - `jsonwebtoken` : pour générer des JWT.
 *    - `uuid` : pour générer des tokens uniques (vérification email, reset password).
 *    - `db` : pool de connexions MySQL.
 *    - Fonctions du model `user.model.js` : createUser, findUserByEmail, verifyUser, etc.
 *    - Fonctions mailer : sendVerificationMail, sendResetPasswordMail.
 *
 * 2. register(req, res) :
 *    - Vérifie si l’email existe déjà.
 *    - Hash du mot de passe avec Argon2.
 *    - Création d’un token de vérification (UUID).
 *    - Création de l’utilisateur en DB.
 *    - Envoi d’un email de vérification.
 *    - Retourne un message de succès.
 *
 * 3. verifyEmail(req, res) :
 *    - Récupère le token depuis la query.
 *    - Cherche l’utilisateur correspondant.
 *    - Si valide, met à jour `is_verified` et supprime le token.
 *    - Retourne message de confirmation.
 *
 * 4. login(req, res) :
 *    - Vérifie email et mot de passe.
 *    - Vérifie si compte validé (`is_verified`).
 *    - Génère un JWT avec id, email, role et expiration.
 *    - Retourne le token au client.
 *
 * 5. resetPasswordRequest(req, res) :
 *    - Vérifie si l’email existe.
 *    - Génère un token UUID pour la réinitialisation.
 *    - Stocke le token en DB et envoie un email.
 *    - Retourne message de succès.
 *
 * 6. resetPassword(req, res) :
 *    - Vérifie le token et récupère l’utilisateur.
 *    - Hash le nouveau mot de passe.
 *    - Met à jour le mot de passe et supprime le token en DB.
 *    - Retourne message de succès.
 *
 * Résumé :
 * Ce fichier centralise toute la logique métier liée à l’authentification :
 * - Inscription, vérification email, login avec JWT.
 * - Gestion de la réinitialisation de mot de passe.
 * Il s’appuie sur les modèles pour interagir avec la DB et sur le mailer pour notifier l’utilisateur.
 */
