const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// Obtener todos los equipos
router.get('/', async (req, res) => {
  try {
    const equipos = await Team.find();
    res.json(equipos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error obteniendo equipos' });
  }
});

// Crear un equipo
router.post('/', async (req, res) => {
  try {
    const { nombre, deporte, capitan } = req.body;

    // Aquí puedes añadir validación de rol: solo admin
    const nuevoTeam = new Team({ nombre, deporte, capitan });
    await nuevoTeam.save();

    res.json({ mensaje: 'Equipo creado', equipo: nuevoTeam });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error creando el equipo' });
  }
});

module.exports = router;

