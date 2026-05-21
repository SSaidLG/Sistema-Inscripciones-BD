// app.js
const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./config/db'); // Esto disparará el console.log de éxito

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (Tus HTML, CSS, JS del frontend)
// Cambiaremos la carpeta 'views' por 'public' para servir HTML puro
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba
app.get('/api/status', (req, res) => {
    res.json({ message: 'API funcionando al 100%' });
});

const alumnosRoutes = require('./routes/alumnos_routes');
app.use('/api/alumnos', alumnosRoutes);

const profesoresRoutes = require('./routes/profesores_routes');
app.use('/api/profesores', profesoresRoutes);

const carrerasRoutes = require('./routes/carreras_routes');
app.use('/api/carreras', carrerasRoutes);

const materiasRoutes = require('./routes/materias_routes');
app.use('/api/materias', materiasRoutes);

const gruposRoutes = require('./routes/grupos_routes');
app.use('/api/grupos', gruposRoutes);

const horariosRoutes = require('./routes/horarios_routes');
app.use('/api/horarios', horariosRoutes);

const inscripcionesRoutes = require('./routes/inscripciones_routes');
app.use('/api/inscripciones', inscripcionesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});