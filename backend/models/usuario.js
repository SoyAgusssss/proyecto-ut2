const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'admin', 'capitan', 'arbitro'], default: 'usuario' },
  equipo: { type: String, default: '' }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
