const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true }, 
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rol: { type: String, enum: ['admin','usuario','capitan','arbitro'], default: 'usuario' }
});

module.exports = mongoose.model('Usuario', usuarioSchema);

