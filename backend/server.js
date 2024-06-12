require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const personaRoutes = require('./routes/personaRoutes');
const planesTrabajoRoutes= require('./routes/planesTrabajoRoutes');
const actividadesRoutes= require('./routes/actividadesRoutes');
const equiposTrabajoRoutes =  require('./routes/equiposTrabajoRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// Serve static files from the public directory
app.use('/imgEstudiantes', express.static(path.join(__dirname, '../frontend/src/imgEstudiantes')));


// Usa las rutas de personaRoutes
app.use('/api/personaRoutes', personaRoutes);
app.use('/api/estudianteRoutes', estudianteRoutes);
app.use('/api/planesTrabajoRoutes', planesTrabajoRoutes);
app.use('/api/actividadesRoutes', actividadesRoutes);
app.use('/api/equiposTrabajoRoutes', equiposTrabajoRoutes);

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });