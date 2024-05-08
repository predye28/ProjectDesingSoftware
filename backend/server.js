require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const personaRoutes = require('./routes/personaRoutes');
const planesTrabajoRoutes= require('./routes/planesTrabajoRoutes');
const actividadesRoutes= require('./routes/actividadesRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Usa las rutas de personaRoutes
app.use('/api/personaRoutes', personaRoutes);
app.use('/api/planesTrabajoRoutes', planesTrabajoRoutes);
app.use('/api/actividadesRoutes', actividadesRoutes);

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });