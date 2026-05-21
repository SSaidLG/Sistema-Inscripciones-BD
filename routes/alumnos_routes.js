// routes/alumnos.routes.js
const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos_controller');

router.get('/', alumnosController.obtenerAlumnos);
router.get('/:id', alumnosController.obtenerAlumno);
router.post('/', alumnosController.crearAlumno);
router.put('/:id', alumnosController.actualizarAlumno);
router.delete('/:id', alumnosController.eliminarAlumno);

module.exports = router;