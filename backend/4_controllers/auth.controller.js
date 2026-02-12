import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { createUser, findUserByEmail, findUserByVerifyToken, verifyUser } from '../2_models/user.model.js';
import { sendVerificationMail } from '../1_config/mailer.js';

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });

    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ success: false, message: 'Email déjà utilisé' });

    const passwordHash = await argon2.hash(password);
    const verifyToken = uuidv4();

    const userId = await createUser(email, passwordHash, verifyToken);

    // Envoi du mail avec le token brut
    console.log("Avant envoi du mail :", email, verifyToken);

    await sendVerificationMail(email, verifyToken);

    console.log("Mail envoyé !");

    res.status(201).json({
      success: true,
      message: 'Inscription réussie ! Un email de confirmation vous a été envoyé.',
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });

    if (!user.is_verified)
      return res.status(403).json({ success: false, message: 'Compte non vérifié!' });

    const valid = await argon2.verify(user.master_password_hash, password);
    if (!valid)
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.status(200).json({ success: true, token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// ---------------- VERIFY EMAIL ----------------

export const verifyEmail = async (req, res) => {
  try {

    const { token } = req.query;

      console.log("Token reçu :", token); 



    if (!token)
      return res.status(400).json({ success: false, message: "Token manquant !" });

    const user = await findUserByVerifyToken(token);

      console.log("Utilisateur trouvé :", user); 


    if (!user)
      return res.status(400).json({ success: false, message: "Token invalide !" });

    await verifyUser(user.id);

    res.status(200).json({ success: true, message: "Votre email a été vérifié !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  }
};


// Lien reset password

/* export const resetPasswordRequest = async (req, res) => {

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
} ; */
        

