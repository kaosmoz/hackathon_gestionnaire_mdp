import  argon2  from 'argon2' ;
import jwt from 'jsonwebtoken' ;
import { v4 as uuid4 } from 'uuid' ;
import 'dotenv/config' ;
import  db  from '../1_config/db.js' ;
import { createUser, findUserByEmail, verifyUser, findUserByVerifyToken, saveResetPassword, findUserByResetToken, updatePassword } from '../2_models/user.model.js' ;
import { sendVerificationMail, sendResetPasswordMail } from '../1_config/mailer.js' ;
 

export const register = async (req, res) => {
    try {
        
const {email, password } = req.body ;

const existing = await findUserByEmail(email) ;

if(existing) return res.status(400).json({message: `L'email existe déjà!`}) ;

    const passwordHash = await argon2.hash(password) ;

    const verifyToken = uuid4() ;

    await createUser(email, passwordHash, verifyToken) ;

    await sendVerificationMail(email, verifyToken) ;

    res.status(201).json({message: "Compte enregistré avec succès ! Veuillez maintenant vérifier votre email :)"}) ;

    } catch (error) {
        res.status(500).json({message: "erreur serveur", error:error.message})  ;
    }

} ;

export const verifyEmail = async (req, res) => {
    try {
        const {token} = req.query ;

        const user = await findUserByVerifyToken(token) ;

        if(!user) return res.status(400).json({message:'token invalide!'}) ;

        await verifyUser(user.id) ;

        res.status(200).json({message:'Votre email a bien été vérifié :)'}) ;
        
    } catch (error) {
        res.status(500).json({message: "erreur serveur", error:error.message}) ;
        
    }
 
} ;

export const login = async(req,res) => {
    try {

        const {email, password} = req.body ;

        const user = await findUserByEmail(email) ;

        if(!user) return res.status(400).json({message:'Email ou mot de passe incorrecte'}) ;

        if(!user.is_verified) return res.status(403).json({message:'Compte non vérifié!'}) ;

        const valid = await argon2.verify(user.password_hash, password) ;

        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}) ;

        res.status(200).json({token}) ;
        
    } catch (error) {
        res.status(500).json({message: "erreur serveur", error:error.message}) ;
        
    }

} ;

// Lien reset password

export const resetPasswordRequest = async (req, res) => {

    try {

        const {email} = req.body ; 

        const user = await findUserByEmail(email) ;

        if(!user) return res.status(400).json({message: 'Email introuvable'}) ;

        const resetToken = uuid4() ;

        await saveResetPassword(user.id, resetToken) ;

        await sendResetPasswordMail(email, resetToken) ;

        res.status(200).json({message:`Email de réinitialisation a été envoyé :) ${resetToken}`})
        
    } catch (error) {
        res.status(500).json({message: "erreur serveur", error: error.message}) ;

    }
} ;

export const resetPassword = async (req, res) => {
    try {

        const {token, password} = req.body ;
        
        const user = await findUserByResetToken(token) ;

        if(!user) return res.status(400).json({message: 'Utilisateur ou token invalide !'}) ;

        const passwordHash = await argon2.hash(password) ;

        await updatePassword(user.id, passwordHash) ;

        await db.query('UPDATE users SET reset_token = NULL WHERE id = ?', [user.id]) ;

        res.status(200).json({message:'Mot de passe modifié avec succès :)'})

                
    } catch (error) {
        res.status(500).json({message: "erreur serveur", error: error.message}) ;
        
    }
} ;
        




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
