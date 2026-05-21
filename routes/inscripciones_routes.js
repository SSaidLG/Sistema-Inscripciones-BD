const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripciones_controller');

router.get('/alumno/:matricula', inscripcionesController.obtenerAlumno);
router.get('/horarios', inscripcionesController.obtenerHorarios);
//router.get('/horario-alumno/:matricula', inscripcionesController.obtenerHorarioAlumno);
//router.post('/', inscripcionesController.crearInscripcion);
//router.delete('/:id', inscripcionesController.eliminarInscripcion);
//router.get('/comprobante/:matricula', inscripcionesController.generarComprobante);

module.exports = router;