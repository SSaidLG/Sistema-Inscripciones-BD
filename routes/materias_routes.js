const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materias_controller');

router.get('/', materiasController.obtenerMaterias );
router.get('/:id', materiasController.obtenerMateria);
router.post('/', materiasController.crearMateria );
router.put('/:id', materiasController.actualizarMateria );
router.delete('/:id', materiasController.eliminarMateria );

module.exports = router;