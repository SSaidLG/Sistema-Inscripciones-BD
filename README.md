#  Sistema de Inscripciones Académicas ICO

Sistema web desarrollado para la gestión integral del proceso de inscripción de alumnos de Ingeniería en Computación.

El proyecto permite la administración de catálogos académicos, gestión de horarios, control de cupos disponibles y registro de inscripciones, proporcionando una solución centralizada para el proceso de inscripción semestral.

---

##  Descripción General

El Sistema de Inscripciones ICO fue desarrollado como proyecto para la materia de Bases de Datos.

La plataforma permite:

- Administración de alumnos.
- Administración de profesores.
- Administración de materias.
- Administración de grupos.
- Administración de carreras.
- Administración de horarios.
- Registro de inscripciones académicas.
- Control automático de cupos disponibles.
- Validación de conflictos de horario.
- Generación de comprobantes de inscripción.

---

#  Funcionalidades Principales

##  Gestión de Alumnos

Permite:

- Registrar alumnos.
- Editar información académica.
- Consultar historial de alumnos.
- Eliminar registros.

Información gestionada:

- Matrícula
- Nombre
- Carrera
- Promedio
- Estado académico

---

##  Gestión de Profesores

Administración completa de profesores:

- Altas
- Bajas
- Cambios
- Consultas

Información gestionada:

- Nombre completo
- Correo electrónico

---

##  Gestión de Materias

Administración del catálogo académico.

Características:

- Créditos
- Materias obligatorias
- Materias optativas
- Materias con laboratorio

Visualización amigable mediante etiquetas descriptivas.

---

##  Gestión de Carreras

Permite administrar:

- Nombre de carrera
- Modalidad
- Área académica
- Créditos requeridos
- Duración

---

##  Gestión de Grupos

Administración de grupos académicos.

Información:

- Clave de grupo
- Turno

---

##  Gestión de Horarios

Administración completa de horarios académicos.

Incluye:

- Materia
- Profesor
- Grupo
- Horarios por día
- Salón
- Periodo escolar
- Cupo máximo
- Cupos disponibles

Además, el sistema permite visualizar horarios de forma clara para evitar errores durante la inscripción.

---

##  Módulo de Inscripciones

Funcionalidad principal del sistema.

Características:

### Búsqueda de alumno

Mediante matrícula.

### Selección de materias

A partir de la oferta académica disponible.

### Validaciones automáticas

- Máximo 7 materias por alumno.
- Validación de cupo disponible.
- Validación de materias duplicadas.
- Validación de conflictos de horario.
- Prevención de inscripciones repetidas.

### Control de cupos

Al confirmar una inscripción:

- Se registra la inscripción.
- Se descuenta automáticamente un lugar disponible.
- Se asegura integridad mediante transacciones SQL.

---

##  Generación de Comprobante

El sistema permite generar comprobantes de inscripción que incluyen:

- Datos del alumno.
- Materias inscritas.
- Créditos.
- Horarios.
- Información académica.

---

# Pantallas del Sistema


## Menú Principal

Acceso rápido a:

- Catálogos
- Inscripciones

---

## Catálogo de Entidades

Panel central para la administración de:

- Alumnos
- Profesores
- Materias
- Carreras
- Grupos
- Horarios

---

## Pantalla de Inscripción

Incluye:

- Búsqueda de alumno.
- Información académica.
- Oferta académica filtrable.
- Materias seleccionadas.
- Confirmación de inscripción.

---

#  Stack Tecnológico

## Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Tailwind CSS
- Font Awesome

## Backend

- Node.js
- Express.js

## Base de Datos

- MySQL

## Herramientas

- Git
- GitHub
- Visual Studio Code

---

#  Estructura del Proyecto

```text
Proyecto-Inscripciones/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── alumnos_controller.js
│   ├── profesores_controller.js
│   ├── materias_controller.js
│   ├── carreras_controller.js
│   ├── grupos_controller.js
│   ├── horarios_controller.js
│   └── inscripciones_controller.js
│
├── routes/
│
├── public/
│   ├── alumnos.html
│   ├── profesores.html
│   ├── materias.html
│   ├── carreras.html
│   ├── grupos.html
│   ├── horarios.html
│   └── inscripciones.html
│
├── app.js
├── package.json
└── README.md
```

---

#  Configuración del Proyecto

## 1. Clonar repositorio

```bash
git clone <url-del-repositorio>
```

```bash
cd Proyecto-Inscripciones
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar Base de Datos

Crear una base de datos MySQL.

Ejemplo:

```sql
CREATE DATABASE sistema_inscripciones;
```

Importar posteriormente el script SQL proporcionado.

---

## 4. Configurar Variables de Entorno

Crear un archivo:

```text
.env
```

Ejemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sistema_inscripciones
PORT=3000
```

---

## 5. Configurar conexión MySQL

Verificar que el archivo:

```text
config/db.js
```

utilice las variables de entorno correspondientes.

Ejemplo:

```javascript
require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = pool;
```

---

## 6. Ejecutar el servidor

```bash
node app.js
```

o

```bash
npm start
```

---

## 7. Acceder al sistema

Abrir:

```text
http://localhost:3000/login/accesoAdmin.html
```

---

#  Consideraciones Importantes

Antes de ejecutar el sistema:

- Configurar correctamente el archivo `.env`.
- Verificar que MySQL se encuentre activo.
- Ejecutar el script de creación de tablas.
- Importar los datos iniciales requeridos.
- Instalar todas las dependencias mediante `npm install`.

---

#  Características Destacadas

- CRUD completo de entidades académicas.
- Arquitectura cliente-servidor.
- Base de datos relacional normalizada.
- Validaciones en frontend y backend.
- Manejo de transacciones SQL.
- Control de concurrencia para cupos.
- Interfaz moderna con Tailwind CSS.
- Gestión centralizada de inscripciones.

---

#  Equipo de Desarrollo

Proyecto desarrollado para la materia de Bases de Datos.

Facultad de Estudios Superiores Aragón  
Universidad Nacional Autónoma de México (UNAM)

Equipo 8:
Integrantes:
•⁠  ⁠Cruz Hernandez Tristan Javier
•⁠  ⁠Dueñas Salas Santiago Antonio
•⁠  ⁠Lopez García Said Eduardo

Ingeniería en Computación