const express = require('express');
const router = express.Router();
const horariosController = require('../controllers/horarios_controller');

router.get('/', horariosController.obtenerHorarios );
router.get('/:id', horariosController.obtenerHorario );
router.post('/', horariosController.crearHorario );
router.put('/:id', horariosController.actualizarHorario );
router.delete('/:id', horariosController.eliminarHorario );

module.exports = router;