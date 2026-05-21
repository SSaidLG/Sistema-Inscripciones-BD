const express = require('express');
const router = express.Router();

const carrerasController = require('../controllers/carreras_controller');

router.get('/', carrerasController.obtenerCarreras);
router.get('/:id', carrerasController.obtenerCarrera);
router.post('/', carrerasController.crearCarrera);
router.put('/:id', carrerasController.actualizarCarrera);
router.delete('/:id', carrerasController.eliminarCarrera);

module.exports = router;