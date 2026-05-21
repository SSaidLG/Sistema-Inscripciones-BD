CREATE DATABASE IF NOT EXISTS inscripciones_FBD;
USE inscripciones_FBD;

-- ==========================================
-- 1. TABLAS CATÁLOGO (Independientes)
-- ==========================================

CREATE TABLE Carrera (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    area INT,
    nombre_carrera VARCHAR(100) NOT NULL,
    modalidad VARCHAR(20),
    duracion INT COMMENT 'Duración en semestres',
    creditos_obligatorios INT,
    creditos_optativos INT
);

CREATE TABLE Profesor (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_profesor VARCHAR(50) NOT NULL,
    ap_paterno_profesor VARCHAR(50),
    ap_materno_profesor VARCHAR(50),
    correo_profesor VARCHAR(100) UNIQUE
);

CREATE TABLE Materia (
    id_materia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL,
    creditos INT,
    tipo TINYINT(1) DEFAULT 0 COMMENT 'Obligatoria 0 / Optativa 1',
    laboratorio TINYINT(1) DEFAULT 0 COMMENT 'Verdadero 1 o Falso 0'
);

CREATE TABLE Grupo (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    grupo INT(4) NOT NULL COMMENT 'Clave del grupo (ej. 1101)',
    turno VARCHAR(20)
);

-- ==========================================
-- 2. TABLAS DEPENDIENTES
-- ==========================================

CREATE TABLE Alumno (
    matricula INT(9) PRIMARY KEY COMMENT 'Reemplaza id_alumno y sirve como PK',
    nombre_alumno VARCHAR(50) NOT NULL,
    ap_paterno VARCHAR(50) NOT NULL,
    ap_materno VARCHAR(50) NOT NULL,
    correo_alumno VARCHAR(100) UNIQUE,
    turno VARCHAR(20),
    generacion INT(4),
    fecha_nacimiento DATE,
    carrera_alumno INT, -- FK hacia Carrera
    semestre INT,
    sistema TINYINT(1) DEFAULT 1 COMMENT 'Escolarizado 1 / SUAyED 0',
    estado TINYINT(1) DEFAULT 1 COMMENT 'Activo 1 / Inactivo 0',
    promedio FLOAT DEFAULT 0.0,
    estatus_pago TINYINT(1) DEFAULT 1 COMMENT 'Relleno por defecto a 1',
    FOREIGN KEY (carrera_alumno) REFERENCES Carrera(id_carrera)
);

-- ==========================================
-- 3. TABLA SÁBANA (Horario / Asignación)
-- ==========================================
-- Esta tabla condensa la relación entre Materia, Profesor y Grupo,
-- manteniendo la estructura visual de días de la semana de tu Excel.

CREATE TABLE Horario (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    semestre_turno VARCHAR(50),
    cve_materia INT, -- FK hacia Materia
    materia VARCHAR(100) COMMENT 'Nombre de la materia redundante del excel',
    id_profesor INT, -- FK hacia Profesor
    id_grupo INT, -- FK hacia Grupo
    lunes VARCHAR(30),
    martes VARCHAR(30),
    miercoles VARCHAR(30),
    jueves VARCHAR(30),
    viernes VARCHAR(30),
    sabado VARCHAR(30),
    salon VARCHAR(30),
    FOREIGN KEY (cve_materia) REFERENCES Materia(id_materia),
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor),
    FOREIGN KEY (id_grupo) REFERENCES Grupo(id_grupo)
);

-- ==========================================
-- 4. TABLA DE INSCRIPCIÓN (Para que el CRUD tenga sentido)
-- ==========================================
-- Cruza la matricula del alumno con el grupo/horario.

CREATE TABLE Inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    matricula INT(9) NOT NULL,
    id_horario INT NOT NULL,
    FOREIGN KEY (matricula) REFERENCES Alumno(matricula),
    FOREIGN KEY (id_horario) REFERENCES Horario(id_horario)
);

DROP TABLE Inscripcion;

ALTER TABLE Horario
ADD cupo_maximo INT DEFAULT 40,
ADD cupos_disponibles INT DEFAULT 40;

ALTER TABLE Horario
ADD periodo_escolar VARCHAR(20) DEFAULT '2026-1';

DESCRIBE Horario;

select * from Inscripcion;


