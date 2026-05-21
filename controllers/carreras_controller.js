const db = require('../config/db');

// READ (Todos)
exports.obtenerCarreras = async (req, res) => {
    try {

        const [carreras] = await db.query(
            'SELECT * FROM Carrera ORDER BY nombre_carrera ASC LIMIT 50'
        );

        res.status(200).json(carreras);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// READ (Uno)
exports.obtenerCarrera = async (req, res) => {
    try {

        const [carrera] = await db.query(
            'SELECT * FROM Carrera WHERE id_carrera = ?',
            [req.params.id]
        );

        res.status(200).json(carrera[0]);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// CREATE
exports.crearCarrera = async (req, res) => {
    try {

        const {
            area,
            nombre_carrera,
            modalidad,
            duracion,
            creditos_obligatorios,
            creditos_optativos
        } = req.body;

        await db.query(
            `INSERT INTO Carrera
            (area, nombre_carrera, modalidad, duracion,
             creditos_obligatorios, creditos_optativos)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                area,
                nombre_carrera,
                modalidad,
                duracion,
                creditos_obligatorios,
                creditos_optativos
            ]
        );

        res.status(201).json({
            mensaje: 'Carrera creada exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// UPDATE
exports.actualizarCarrera = async (req, res) => {
    try {

        const {
            area,
            nombre_carrera,
            modalidad,
            duracion,
            creditos_obligatorios,
            creditos_optativos
        } = req.body;

        await db.query(
            `UPDATE Carrera
            SET area = ?,
                nombre_carrera = ?,
                modalidad = ?,
                duracion = ?,
                creditos_obligatorios = ?,
                creditos_optativos = ?
            WHERE id_carrera = ?`,
            [
                area,
                nombre_carrera,
                modalidad,
                duracion,
                creditos_obligatorios,
                creditos_optativos,
                req.params.id
            ]
        );

        res.status(200).json({
            mensaje: 'Carrera actualizada exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

// DELETE
exports.eliminarCarrera = async (req, res) => {
    try {

        await db.query(
            'DELETE FROM Carrera WHERE id_carrera = ?',
            [req.params.id]
        );

        res.status(200).json({
            mensaje: 'Carrera eliminada exitosamente'
        });

    } catch (error) {

        if(error.errno === 1451) {
            return res.status(400).json({
                mensaje: 'No se puede eliminar: La carrera tiene registros asociados.'
            });
        }

        res.status(500).json({
            mensaje: error.message
        });
    }
};