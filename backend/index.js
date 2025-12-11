const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/usuarios'));
app.use('/api/matches', require('./routes/matchs'));
app.use('/api/teams', require('./routes/teams'));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

app.get('/', (req, res) => res.send('Servidor backend funcionando'));

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));


