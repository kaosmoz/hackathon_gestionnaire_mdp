import { sendVerificationMail } from './1_config/mailer.js';

sendVerificationMail('ton_email@gmail.com', 'test-token-123')
  .then(() => console.log('Mail envoyé !'))
  .catch(console.error);
