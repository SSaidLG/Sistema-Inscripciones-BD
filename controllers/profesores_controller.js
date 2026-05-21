// controllers/profesores_controller.js
const db = require('../config/db');

// READ (Todos)
exports.obtenerProfesores = async (req, res) => {
    try {
        const [profesores] = await db.query('SELECT * FROM Profesor ORDER BY ap_paterno_profesor ASC LIMIT 50');
        res.status(200).json(profesores);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// READ (Solo uno, útil para rellenar el formulario al editar)
exports.obtenerProfesor = async (req, res) => {
    try {
        const [profesor] = await db.query('SELECT * FROM Profesor WHERE id_profesor = ?', [req.params.id]);
        res.status(200).json(profesor[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// CREATE (Insertar nuevo)
exports.crearProfesor = async (req, res) => {
    try {
        const { nombre_profesor, ap_paterno_profesor, ap_materno_profesor, correo_profesor } = req.body;
        // Se insertan los campos base. Los demás toman los valores DEFAULT que configuramos en SQL.
        await db.query(
        `INSERT INTO Profesor
        (nombre_profesor, ap_paterno_profesor, ap_materno_profesor, correo_profesor)
        VALUES (?, ?, ?, ?)`,
        [nombre_profesor, ap_paterno_profesor, ap_materno_profesor, correo_profesor]
        );
        res.status(201).json({ mensaje: 'Profesor creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// UPDATE (Actualizar existente)
exports.actualizarProfesor = async (req, res) => {
    try {
        const { nombre_profesor, ap_paterno_profesor, ap_materno_profesor, correo_profesor } = req.body;
        await db.query(
        'UPDATE Profesor SET nombre_profesor = ?, ap_paterno_profesor = ?, ap_materno_profesor = ?, correo_profesor = ? WHERE id_profesor = ?',
        [nombre_profesor, ap_paterno_profesor, ap_materno_profesor, correo_profesor, req.params.id]
        );
        res.status(200).json({ mensaje: 'Profesor actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// DELETE (Borrar)
exports.eliminarProfesor = async (req, res) => {
    try {
        await db.query('DELETE FROM Profesor WHERE id_profesor = ?', [req.params.id]);
        res.status(200).json({ mensaje: 'Profesor eliminado exitosamente' });
    } catch (error) {
        // Error 1451 es cuando intentas borrar un alumno que ya tiene inscripciones ligadas
        if(error.errno === 1451) {
            return res.status(400).json({ mensaje: 'No se puede eliminar: El Profesor tiene grupos activos.' });
        }
        res.status(500).json({ mensaje: error.message });
    }
};