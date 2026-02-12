import 'dotenv/config' ;
import app from "./app.js" ;
import db from "../backend/1_config/db.js"; 
import './1_config/mailer.js';



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Le serveur tourne sur http://localhost:${PORT}`)) ;



