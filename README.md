# Password Manager — 2FA Full-stack

Gestionnaire de mots de passe avec authentification double facteur. Front React + Tailwind, API REST Node.js, opérations CRUD complètes. Projet en autonomie, conçu et livré en solo de bout en bout.

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)



---

## Features

- Inscription / connexion utilisateur avec session JWT
- **Authentification double facteur** par code envoyé par email
- CRUD complet sur les credentials (titre, identifiant, mot de passe, URL, notes)
- Hash des mots de passe utilisateurs en **argon2** (recommandation OWASP)
- Validation stricte des payloads avec **Zod**
- Headers HTTP durcis (Helmet)
- Architecture MVC séparée
- Interface React responsive avec Tailwind CSS

---

## Stack

### Back-end

| Lib | Rôle |
| --- | --- |
| **Express 5** | Framework HTTP, routing, middlewares |
| **MySQL** | Base de données relationnelle (driver `mysql2`) |
| **jsonwebtoken** | Génération et vérification des tokens d'authentification |
| **Zod** | Validation des schémas de requête (type-safe) |
| **argon2** | Hash des mots de passe utilisateurs (alternative moderne à bcrypt) |
| **Helmet** | Sécurisation des headers HTTP (CSP, XSS, clickjacking, etc.) |
| **CORS** | Gestion des requêtes cross-origin pour le front |
| **Nodemailer** | Envoi du code 2FA par email |

### Front-end

| Lib | Rôle |
| --- | --- |
| **React 18** | Composants, hooks, état |
| **Vite** | Bundler et dev server |
| **Tailwind CSS** | Design system utility-first |
| **Axios** | Client HTTP pour les appels à l'API |

---

## Captures d'écran

| Page connexion | Notification d'envoie de mail | Message dans liste boîte mail | Corps du message avec CTA token | Master password crypté par argon2 | Dashboard du compte | Création du vault sécurisé |
| --- | --- | --- |

<img width="1920" height="972" alt="1-page-connexion" src="https://github.com/user-attachments/assets/b1681e8e-8f2c-4f35-9d1a-2a7f9a6d0764" />
<img width="1920" height="972" alt="2-validation-mail" src="https://github.com/user-attachments/assets/080d4f0c-f50b-4366-97e7-9015baa13d1e" />
<img width="1920" height="972" alt="3-boite-mail" src="https://github.com/user-attachments/assets/91fdd491-13f8-4358-af90-3a011f136758" />
<img width="1920" height="972" alt="4-mail-validation" src="https://github.com/user-attachments/assets/3b303bfd-fd2d-477c-80d5-6c261c7cb203" />
<img width="1645" height="366" alt="5-argon2-storage" src="https://github.com/user-attachments/assets/e456b4c4-cecb-465c-864d-d8a5f626e2bc" />
<img width="1920" height="972" alt="6-dashboard" src="https://github.com/user-attachments/assets/16791f83-6f5b-4e5b-9955-1e6710c22ac9" />
<img width="1920" height="972" alt="7-creation-vault" src="https://github.com/user-attachments/assets/cca973d7-a283-496f-b47f-eceb7c5a4889" />







---

## Quick start

### Prérequis

- Node.js 20+
- MySQL 8+ (local ou distant)
- Un compte SMTP (Gmail, Mailtrap, etc.) pour l'envoi des codes 2FA

### Installation

```bash
# Cloner le projet
git clone https://github.com/maximegarin/password-manager-api.git
cd password-manager-api

# === BACK-END ===
cd server
npm install

# Configurer l'environnement
cp .env.example .env


# Créer la base de données
mysql -u root -p < migrations/init.sql

# Lancer le serveur (dev)
npm run dev
# → API disponible sur http://localhost:3000

# === FRONT-END (dans un autre terminal) ===
cd ../client
npm install
npm run dev
# → App React disponible sur http://localhost:5173
```

### Variables d'environnement (`.env`)

```ini
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=password_manager

# JWT
JWT_SECRET=your_super_long_random_secret
JWT_EXPIRES_IN=24h

# SMTP (envoi 2FA)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=Password Manager <noreply@your-domain.com>

# CORS
CLIENT_URL=http://localhost:5173

# Server
PORT=3000
NODE_ENV=development
```

---

## API endpoints

| Méthode | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | ❌ | Création de compte (validation Zod, hash argon2) |
| `POST` | `/api/auth/login` | ❌ | Connexion — déclenche envoi du code 2FA par email |
| `POST` | `/api/auth/verify-2fa` | ❌ | Vérification du code 2FA — retourne le JWT |
| `GET` | `/api/credentials` | ✅ JWT | Liste les credentials de l'utilisateur |
| `POST` | `/api/credentials` | ✅ JWT | Crée un credential |
| `PUT` | `/api/credentials/:id` | ✅ JWT | Modifie un credential |
| `DELETE` | `/api/credentials/:id` | ✅ JWT | Supprime un credential |

### Exemple de payload (POST `/api/credentials`)

```json
{
  "title": "GitHub",
  "username": "maximegarin",
  "password": "user-stored-password",
  "url": "https://github.com",
  "notes": "Compte perso pour les projets"
}
```

Validation Zod côté serveur garantit que `title` et `password` sont obligatoires et non vides, que `url` est une URL valide, etc.

---

## Architecture

```
.
├── server/                         API Node.js / Express
│   ├── src/
│   │   ├── controllers/            Logique métier par ressource
│   │   ├── models/                 Accès données MySQL
│   │   ├── routes/                 Définition des endpoints
│   │   ├── middlewares/            Auth JWT, validation Zod, errors
│   │   ├── services/               Nodemailer, génération 2FA
│   │   ├── schemas/                Schémas Zod
│   │   └── server.js               Entry point
│   ├── migrations/
│   │   └── init.sql                Création des tables
│   └── package.json
│
├── client/                         App React / Vite
│   ├── src/
│   │   ├── components/             Composants UI
│   │   ├── pages/                  Login, Dashboard, etc.
│   │   ├── hooks/                  useAuth, useCredentials
│   │   ├── api/                    Wrapper Axios
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

Séparation stricte front / back : les deux peuvent être déployés indépendamment (Render pour le back, Vercel ou Netlify pour le front).

---

## Sécurité

- Mots de passe utilisateurs hashés en **argon2id** (preset OWASP) — jamais stockés en clair
- Tokens JWT signés HS256, expiration courte (24h par défaut)
- Validation systématique côté serveur via **Zod** (pas de confiance au client)
- Headers HTTP durcis par **Helmet** (CSP, X-Frame-Options, etc.)
- CORS configuré pour autoriser uniquement l'origine du front
- Aucun secret dans le code (tout via `.env`, fichier exclu du repo via `.gitignore`)
- Double facteur par email obligatoire à la connexion

⚠️ Note : le mot de passe que l'utilisateur stocke comme credential (ex : son mot de passe GitHub) est actuellement stocké en clair en base. Une amélioration prévue est le chiffrement symétrique avec une clé dérivée du mot de passe maître — non implémenté à date pour ce projet d'apprentissage.

---

## Roadmap

- [ ] Chiffrement client-side des credentials avant envoi en base (zero-knowledge)
- [ ] Export / import au format CSV chiffré
- [ ] Génération de mots de passe forts intégrée
- [ ] Mode hors-ligne avec sync
- [ ] Application mobile React Native

---


## Auteur

**Maxime Garin** — [github.com/maximegarin](https://github.com/maximegarin) 

Projet réalisé en autonomie sur une semaine pendant ma formation Titre Pro Développeur Web à l'AFEC Bayonne (2024–2026).
