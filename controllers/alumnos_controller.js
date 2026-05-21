// controllers/alumnos.controller.js
const db = require('../config/db');

// READ (Todos)
exports.obtenerAlumnos = async (req, res) => {
    try {
        const [alumnos] = await db.query('SELECT * FROM Alumno ORDER BY ap_paterno ASC LIMIT 50');
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// READ (Solo uno, útil para rellenar el formulario al editar)
exports.obtenerAlumno = async (req, res) => {
    try {
        const [alumno] = await db.query('SELECT * FROM Alumno WHERE matricula = ?', [req.params.id]);
        res.status(200).json(alumno[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// CREATE (Insertar nuevo)
exports.crearAlumno = async (req, res) => {
    try {
        const { matricula, nombre_alumno, ap_paterno, ap_materno, correo_alumno, carrera_alumno } = req.body;
        // Se insertan los campos base. Los demás toman los valores DEFAULT que configuramos en SQL.
        await db.query(
            `INSERT INTO Alumno (matricula, nombre_alumno, ap_paterno, ap_materno, correo_alumno, carrera_alumno, fecha_nacimiento, generacion) 
             VALUES (?, ?, ?, ?, ?, ?, '2000-01-01', 2024)`,
            [matricula, nombre_alumno, ap_paterno, ap_materno, correo_alumno, carrera_alumno || 110]
        );
        res.status(201).json({ mensaje: 'Alumno creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// UPDATE (Actualizar existente)
exports.actualizarAlumno = async (req, res) => {
    try {
        const { nombre_alumno, ap_paterno, ap_materno, correo_alumno, promedio } = req.body;
        await db.query(
            'UPDATE Alumno SET nombre_alumno = ?, ap_paterno = ?, ap_materno = ?, correo_alumno = ?, promedio = ? WHERE matricula = ?',
            [nombre_alumno, ap_paterno, ap_materno, correo_alumno, promedio, req.params.id]
        );
        res.status(200).json({ mensaje: 'Alumno actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// DELETE (Borrar)
exports.eliminarAlumno = async (req, res) => {
    try {
        await db.query('DELETE FROM Alumno WHERE matricula = ?', [req.params.id]);
        res.status(200).json({ mensaje: 'Alumno eliminado exitosamente' });
    } catch (error) {
        // Error 1451 es cuando intentas borrar un alumno que ya tiene inscripciones ligadas
        if(error.errno === 1451) {
            return res.status(400).json({ mensaje: 'No se puede eliminar: El alumno tiene inscripciones activas.' });
        }
        res.status(500).json({ mensaje: error.message });
    }
};