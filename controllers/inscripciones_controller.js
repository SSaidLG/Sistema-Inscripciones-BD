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

// POST: Confirmar inscripción
exports.confirmarInscripcion = async (req, res) => {
    const { matricula, horarios } = req.body; 
    // horarios es un arreglo de id_horario: [1, 5, 12]

    const conexion = await db.getConnection();

    try {
        await conexion.beginTransaction(); // Iniciar transacción segura

        // 1. Validar desde el backend máximo de materias
        if (!horarios || horarios.length === 0 || horarios.length > 7) {
            throw new Error('Cantidad de materias inválida (1 a 7).');
        }

        // 2. Iterar sobre cada horario para validar cupo, inscribir y descontar
        for (const id_horario of horarios) {
            
            // a) Bloquear la fila temporalmente y revisar cupo (Previene sobrecupo por concurrencia)
            const [rows] = await conexion.query('SELECT cupos_disponibles FROM Horario WHERE id_horario = ? FOR UPDATE', [id_horario]);
            
            if (rows.length === 0) throw new Error(`El horario ID ${id_horario} no existe.`);
            if (rows[0].cupos_disponibles <= 0) throw new Error(`El grupo con horario ID ${id_horario} ya no tiene cupo.`);

            // b) Verificar si el alumno ya la inscribió (para evitar F5 malicioso)
            const [duplicados] = await conexion.query('SELECT id_inscripcion FROM Inscripcion WHERE matricula = ? AND id_horario = ?', [matricula, id_horario]);
            if (duplicados.length > 0) throw new Error(`Ya estás inscrito en el horario ${id_horario}.`);

            // c) Insertar la inscripción
            await conexion.query(
                'INSERT INTO Inscripcion (matricula, id_horario) VALUES (?, ?)',
                [matricula, id_horario]
            );

            // d) Descontar el cupo
            await conexion.query(
                'UPDATE Horario SET cupos_disponibles = cupos_disponibles - 1 WHERE id_horario = ?',
                [id_horario]
            );
        }

        await conexion.commit(); // Todo salió bien, confirmar cambios en BD
        res.status(200).json({ mensaje: 'Inscripción confirmada exitosamente.' });

    } catch (error) {
        await conexion.rollback(); // Si algo falla, se deshace todo (no se descuentan cupos)
        res.status(400).json({ mensaje: error.message });
    } finally {
        conexion.release();
    }
};