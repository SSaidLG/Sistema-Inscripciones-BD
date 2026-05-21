// routes/alumnos.routes.js
const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesores_controller');

router.get('/', profesoresController.obtenerProfesores);
router.get('/:id', profesoresController.obtenerProfesor);
router.post('/', profesoresController.crearProfesor);
router.put('/:id', profesoresController.actualizarProfesor);
router.delete('/:id', profesoresController.eliminarProfesor);

module.exports = router;