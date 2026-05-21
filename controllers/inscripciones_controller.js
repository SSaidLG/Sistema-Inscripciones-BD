const db = require('../config/db');

//Obtener datos Alumno
exports.obtenerAlumno = async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const [alumno] = await db.query(
            `
            SELECT
                a.matricula,
                a.nombre_alumno,
                a.ap_paterno,
                a.ap_materno,
                a.promedio,
                a.estado,
                c.nombre_carrera
            FROM Alumno a
            LEFT JOIN Carrera c
                ON a.carrera_alumno = c.id_carrera
            WHERE a.matricula = ?
            `,
            [matricula]
        );
        if(alumno.length === 0){
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            });
        }
        res.status(200).json(alumno[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};


// OBTENER HORARIOS DISPONIBLES
exports.obtenerHorarios = async (req, res) => {
    try {
        const [horarios] = await db.query(
            `
            SELECT
                h.id_horario,
                h.semestre_turno,
                h.periodo_escolar,

                h.lunes,
                h.martes,
                h.miercoles,
                h.jueves,
                h.viernes,
                h.sabado,

                h.salon,

                h.cupo_maximo,
                h.cupos_disponibles,

                m.id_materia,
                m.nombre_materia,
                m.creditos,
                m.tipo,

                g.grupo,

                p.nombre_profesor,
                p.ap_paterno_profesor

            FROM Horario h

            LEFT JOIN Materia m
                ON h.cve_materia = m.id_materia

            LEFT JOIN Profesor p
                ON h.id_profesor = p.id_profesor

            LEFT JOIN Grupo g
                ON h.id_grupo = g.id_grupo

            WHERE h.cupos_disponibles > 0

            ORDER BY
                m.nombre_materia ASC
            `
        );
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};