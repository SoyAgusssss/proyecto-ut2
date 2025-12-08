const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// GET todos los partidos
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error obteniendo partidos' });
  }
});

// POST crear partido
router.post('/', async (req, res) => {
  try {
    const nuevoMatch = new Match(req.body);
    await nuevoMatch.save();
    res.status(201).json(nuevoMatch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error creando partido' });
  }
});

// PUT actualizar partido
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error actualizando partido' });
  }
});

module.exports = router;


