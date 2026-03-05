const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Obtener jugadores (usuarios con rol "usuario")
router.get('/', async (req, res) => {
  try {
    const jugadores = await Usuario.find({ rol: 'usuario' });
    res.json(jugadores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error obteniendo jugadores' });
  }
});

// Crear jugador
router.post('/', async (req, res) => {
  try {
    const { usuario, email, password, equipo, deporte } = req.body;

    if (!usuario || !password || !email) {
      return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const existe = await Usuario.findOne({ $or: [{ usuario }, { email }] });
    if (existe) {
      return res.status(400).json({ mensaje: 'Usuario o email ya existe' });
    }

    const nuevoJugador = new Usuario({
      usuario,
      email,
      password,
      rol: 'usuario',
      equipo: equipo || '',
      deporte: deporte || ''
    });

    await nuevoJugador.save();
    res.status(201).json({ mensaje: 'Jugador registrado', jugador: nuevoJugador });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error creando jugador' });
  }
});

module.exports = router;