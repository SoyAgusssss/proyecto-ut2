const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  deporte: { type: String, required: true },
  equipo1: { type: String, required: true },
  equipo2: { type: String, required: true },
  goles1: { type: Number, default: 0 },
  goles2: { type: Number, default: 0 },
  puntos1: { type: Number, default: 0 },
  puntos2: { type: Number, default: 0 },
  fecha: { type: Date, required: true },
  arbitro: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'finalizado'], default: 'pendiente' }
});

module.exports = mongoose.model('Match', matchSchema);


