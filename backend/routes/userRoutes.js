const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// 🔐 Connexion utilisateur
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ Utilisateur non trouvé :", username);
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("❌ Mot de passe incorrect pour :", username);
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    console.log("✅ Connexion réussie pour :", username);
    res.json({ schedule: user.schedule, events: user.events || [] });
  } catch (err) {
    console.error("💥 Erreur serveur (login) :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 📋 Récupérer tous les plannings (admin)
router.get('/schedules', async (req, res) => {
  try {
    const users = await User.find({}, 'username schedule');
    res.json(users);
  } catch (err) {
    console.error("💥 Erreur serveur (schedules) :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ➕ Ajouter un événement personnel
router.post('/add-event', async (req, res) => {
  const { username, titre, date, type } = req.body;
  console.log("➡️ Requête reçue pour ajout d’événement :", req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ Utilisateur introuvable :", username);
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    if (!user.events) {
      console.log("ℹ️ Champ 'events' non défini, création forcée");
      user.events = [];
    }

    user.events.push({ titre, date, type });
    await user.save();

    console.log("✅ Événement ajouté avec succès :", { titre, date, type });
    res.json({ message: 'Événement ajouté', events: user.events });
  } catch (err) {
    console.error("💥 Erreur serveur (add-event) :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ❌ Supprimer un événement par index
router.post('/delete-event', async (req, res) => {
  const { username, index } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.events || index < 0 || index >= user.events.length) {
      return res.status(400).json({ message: 'Événement introuvable' });
    }

    user.events.splice(index, 1);
    await user.save();

    res.json({ message: 'Événement supprimé', events: user.events });
  } catch (err) {
    console.error("💥 Erreur serveur (delete-event) :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
