const db = require('../config/db');

// READ (Todos)
exports.obtenerHorarios = async (req, res) => {

    try {

        const [horarios] = await db.query(

            `SELECT
                h.*,

                m.nombre_materia,

                p.nombre_profesor,
                p.ap_paterno_profesor,

                g.grupo

            FROM Horario h

            LEFT JOIN Materia m
                ON h.cve_materia = m.id_materia

            LEFT JOIN Profesor p
                ON h.id_profesor = p.id_profesor

            LEFT JOIN Grupo g
                ON h.id_grupo = g.id_grupo

            ORDER BY h.id_horario ASC

            LIMIT 100`
        );

        res.status(200).json(horarios);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// READ (Uno)
exports.obtenerHorario = async (req, res) => {

    try {

        const [horario] = await db.query(

            'SELECT * FROM Horario WHERE id_horario = ?',

            [req.params.id]
        );

        res.status(200).json(horario[0]);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// CREATE
exports.crearHorario = async (req, res) => {

    try {

        const {

            semestre_turno,
            cve_materia,
            materia,
            id_profesor,
            id_grupo,

            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,

            salon

        } = req.body;

        await db.query(

            `INSERT INTO Horario (

                semestre_turno,
                cve_materia,
                materia,
                id_profesor,
                id_grupo,

                lunes,
                martes,
                miercoles,
                jueves,
                viernes,
                sabado,

                salon

            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [

                semestre_turno,
                cve_materia,
                materia,
                id_profesor,
                id_grupo,

                lunes,
                martes,
                miercoles,
                jueves,
                viernes,
                sabado,

                salon
            ]
        );

        res.status(201).json({
            mensaje: 'Horario creado exitosamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// UPDATE
exports.actualizarHorario = async (req, res) => {

    try {

        const {

            semestre_turno,
            cve_materia,
            materia,
            id_profesor,
            id_grupo,

            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,

            salon

        } = req.body;

        await db.query(

            `UPDATE Horario

            SET

                semestre_turno = ?,
                cve_materia = ?,
                materia = ?,
                id_profesor = ?,
                id_grupo = ?,

                lunes = ?,
                martes = ?,
                miercoles = ?,
                jueves = ?,
                viernes = ?,
                sabado = ?,

                salon = ?

            WHERE id_horario = ?`,
            [

                semestre_turno,
                cve_materia,
                materia,
                id_profesor,
                id_grupo,

                lunes,
                martes,
                miercoles,
                jueves,
                viernes,
                sabado,

                salon,

                req.params.id
            ]
        );

        res.status(200).json({
            mensaje: 'Horario actualizado exitosamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// DELETE
exports.eliminarHorario = async (req, res) => {

    try {

        await db.query(
            'DELETE FROM Horario WHERE id_horario = ?',
            [req.params.id]
        );

        res.status(200).json({
            mensaje: 'Horario eliminado exitosamente'
        });

    } catch (error) {

        if(error.errno === 1451) {

            return res.status(400).json({
                mensaje: 'No se puede eliminar: El horario tiene registros asociados.'
            });
        }

        res.status(500).json({
            mensaje: error.message
        });
    }
};