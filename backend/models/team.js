const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  deporte: { type: String, required: true },
  capitan: { type: String, default: '' }
});

module.exports = mongoose.model('Team', TeamSchema);

