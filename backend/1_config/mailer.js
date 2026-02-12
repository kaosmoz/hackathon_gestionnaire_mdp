import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  }
});

transporter.verify((err, success) => {
  if (err) console.error("Erreur SMTP ", err.message);
  else console.log('SMTP online');
});

export const sendVerificationMail = async (email, token) => {
  const frontendUrl = 'http://localhost:5173' || 'http://localhost:5174';
  const encodedToken = encodeURIComponent(token);

  await transporter.sendMail({
    from: 'SecureVault <maxime.afec@gmail.com>',
    to: email,
    subject: 'Confirmation de votre email',
    html: `
      <h2>Bienvenue ${email} !</h2>
      <p>Merci pour votre inscription ! Cliquez sur le bouton ci-dessous pour vérifier votre email :</p>
      <a href="${frontendUrl}/verify-email?token=${encodedToken}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:white;border-radius:6px;text-decoration:none;">Vérifier mon email</a>
    `
  });

  console.log(`Email de vérification envoyé à ${email}`);
};



/* export const sendResetPasswordMail = async (email, token) => {

    await transporter.sendMail({
        from: 'RESET PASSWORD API <maxime.afec@gmail.com>',
        to: email,
        subject: 'Réinitialisation du mot de passe',
        html: `<h2> Bienvenue ${email}! </h2>
        <p> Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</p> <br/>
        <a href="http://localhost:3000/api/auth/reset-password-request?token=${token}">Réinitialiser votre mot de passe</a>
        `
    }) ;

} ; */