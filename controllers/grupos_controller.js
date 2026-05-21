const db = require('../config/db');

// READ (Todos)
exports.obtenerGrupos = async (req, res) => {
    try {
        const [grupos] = await db.query(
            'SELECT * FROM Grupo ORDER BY grupo ASC LIMIT 50'
        );
        res.status(200).json(grupos);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// READ (Uno)
exports.obtenerGrupo = async (req, res) => {
    try {
        const [grupo] = await db.query(
            'SELECT * FROM Grupo WHERE id_grupo = ?',
            [req.params.id]
        );
        res.status(200).json(grupo[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// CREATE
exports.crearGrupo = async (req, res) => {
    try {
        const {
            grupo,
            turno
        } = req.body;
        await db.query(
            `INSERT INTO Grupo
            (grupo, turno)
            VALUES (?, ?)`,
            [
                grupo,
                turno
            ]
        );
        res.status(201).json({
            mensaje: 'Grupo creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// UPDATE
exports.actualizarGrupo = async (req, res) => {
    try {
        const {
            grupo,
            turno
        } = req.body;

        await db.query(
            `UPDATE Grupo
            SET grupo = ?,
                turno = ?
            WHERE id_grupo = ?`,
            [
                grupo,
                turno,
                req.params.id
            ]
        );
        res.status(200).json({
            mensaje: 'Grupo actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// DELETE
exports.eliminarGrupo = async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Grupo WHERE id_grupo = ?',
            [req.params.id]
        );
        res.status(200).json({
            mensaje: 'Grupo eliminado exitosamente'
        });
    } catch (error) {
        if(error.errno === 1451) {
            return res.status(400).json({
                mensaje: 'No se puede eliminar: El grupo tiene registros asociados.'
            });
        }
        res.status(500).json({
            mensaje: error.message
        });
    }
};