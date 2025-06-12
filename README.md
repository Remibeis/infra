# 🛠️ Infrastructure - Forum Ynov

Ce projet constitue l'infrastructure d'une application web (forum), avec une architecture **frontend/backend** simple.  
Il est conçu pour gérer les utilisateurs, fournir une interface web, et s'intégrer dans un environnement Docker ou NGINX.

## 🚀 Fonctionnalités

- API REST en Node.js (Express) pour la gestion des utilisateurs
- Frontend HTML/CSS/JS pour l’interface web
- Architecture modulaire : `routes`, `controllers`, `models`
- Prise en charge d’un environnement `.env` pour les variables sensibles
- Prêt pour être conteneurisé (ex. : via Docker ou déployé derrière NGINX)

## 📁 Structure du projet

```
infra-main/
├── backend/
│   ├── .env                       # Variables d’environnement
│   ├── addUser.js                # Script d’ajout d’utilisateur
│   ├── server.js                 # Serveur Express
│   ├── controllers/
│   │   └── userController.js     # Logique métier utilisateurs
│   ├── routes/
│   │   └── userRoutes.js         # Définition des routes API
│   └── models/
│       └── User.js               # Modèle utilisateur (ex : Mongoose)
├── frontend/
│   ├── index.html                # Page d’accueil
│   ├── styles.css                # Feuilles de style
│   └── script.js                 # Logique front
├── package.json                  # Dépendances et scripts Node
└── README.md                     # Documentation du projet
```

## ▶️ Lancement en local

1. Allez dans le dossier `infra-main/backend`  
2. Installez les dépendances :

```bash
npm install
```

3. Démarrez le serveur :

```bash
node server.js
```

4. Ouvrez `frontend/index.html` dans votre navigateur

## 📦 Technologies

- Node.js
- Express
- HTML / CSS / JavaScript vanilla

## ✍️ Auteur

- **Rémi B.**
- Étudiant en cybersécurité à Ynov Lille
- Pierrick
- Alex
