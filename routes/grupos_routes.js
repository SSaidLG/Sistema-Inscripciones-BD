const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/grupos_controller');

router.get('/', gruposController.obtenerGrupos );
router.get('/:id', gruposController.obtenerGrupo );
router.post('/', gruposController.crearGrupo );
router.put('/:id', gruposController.actualizarGrupo );
router.delete('/:id', gruposController.eliminarGrupo );

module.exports = router;