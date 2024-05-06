require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const personaRoutes = require('./routes/personaRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Usa las rutas de personaRoutes
app.use('/api/personaRoutes', personaRoutes);

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });