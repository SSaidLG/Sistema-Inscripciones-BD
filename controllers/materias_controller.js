const db = require('../config/db');

// READ (Todos)
exports.obtenerMaterias = async (req, res) => {
    try {
        const [materias] = await db.query(
            'SELECT * FROM Materia ORDER BY nombre_materia ASC LIMIT 50'
        );
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// READ (Uno)
exports.obtenerMateria = async (req, res) => {
    try {
        const [materia] = await db.query(
            'SELECT * FROM Materia WHERE id_materia = ?',
            [req.params.id]
        );
        res.status(200).json(materia[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// CREATE
exports.crearMateria = async (req, res) => {
    try {
        const {
            nombre_materia,
            creditos,
            tipo,
            laboratorio
        } = req.body;
        await db.query(
            `INSERT INTO Materia
            (nombre_materia, creditos, tipo, laboratorio)
            VALUES (?, ?, ?, ?)`,
            [
                nombre_materia,
                creditos,
                tipo,
                laboratorio
            ]
        );
        res.status(201).json({
            mensaje: 'Materia creada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// UPDATE
exports.actualizarMateria = async (req, res) => {
    try {
        const {
            nombre_materia,
            creditos,
            tipo,
            laboratorio
        } = req.body;
        await db.query(
            `UPDATE Materia
            SET nombre_materia = ?,
                creditos = ?,
                tipo = ?,
                laboratorio = ?
            WHERE id_materia = ?`,
            [
                nombre_materia,
                creditos,
                tipo,
                laboratorio,
                req.params.id
            ]
        );
        res.status(200).json({
            mensaje: 'Materia actualizada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// DELETE
exports.eliminarMateria = async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Materia WHERE id_materia = ?',
            [req.params.id]
        );
        res.status(200).json({
            mensaje: 'Materia eliminada exitosamente'
        });
    } catch (error) {
        if(error.errno === 1451) {
            return res.status(400).json({
                mensaje: 'No se puede eliminar: La materia tiene registros asociados.'
            });
        }
        res.status(500).json({
            mensaje: error.message
        });
    }
};