// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const usuariosRouter = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando');
});

// Levantar servidor
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
