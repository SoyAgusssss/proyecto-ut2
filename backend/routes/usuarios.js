// backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Ruta de prueba
router.get('/test', (req, res) => {
  res.send("Ruta usuarios cargada");
});

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const { usuario, password, email, rol } = req.body;

    // Validación básica
    if (!usuario || !password || !email) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    // Crear el usuario
    const nuevoUsuario = new Usuario({
      usuario,
      password,
      email,
      rol: rol || "usuario"  // default si no envían rol
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario
    });

  } catch (error) {
    console.error(error);

    // Manejo de error de email duplicado
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: "Faltan usuario o contraseña" });
    }

    // Buscar usuario
    const user = await Usuario.findOne({ usuario });

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Comprobar password (por ahora simple)
    if (user.password !== password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Respuesta correcta
    res.json({
      mensaje: "Login correcto",
      usuario: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

module.exports = router;




