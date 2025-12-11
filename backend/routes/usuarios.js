const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { usuario, password, email, rol, equipo, deporte } = req.body;

    if (!usuario || !password || !email)
      return res.status(400).json({ mensaje: "Faltan datos" });

    const exist = await Usuario.findOne({ $or: [{ usuario }, { email }] });
    if (exist) return res.status(400).json({ mensaje: "Usuario o email ya existe" });

    const nuevoUsuario = new Usuario({
      usuario,
      password,
      email,
      rol: rol || "usuario",
      equipo: equipo || '',
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado", usuario: nuevoUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error servidor" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password)
      return res.status(400).json({ mensaje: "Faltan usuario o contraseña" });

    const user = await Usuario.findOne({ usuario });
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    if (user.password !== password)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    res.json({ mensaje: "Login correcto", usuario: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error servidor" });
  }
});

// Obtener todos
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error obteniendo usuarios" });
  }
});

// 🔥 NUEVO → Obtener por rol
router.get('/rol/:rol', async (req, res) => {
  try {
    const rol = req.params.rol;
    const usuarios = await Usuario.find({ rol });
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error obteniendo usuarios por rol" });
  }
});

module.exports = router;







