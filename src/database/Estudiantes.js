const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'estudiantes',
  password: 'postgres',
  port: 5432,
});

// Obtener todos los estudiantes
const getAllStudents = async () => {
  try {
    const res = await pool.query('SELECT * FROM alumnos');
    return res.rows;
  } catch (error) {
    throw error;
  }
};

// Obtener un estudiante por ID
const getOneStudent = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

// Agregar un nuevo estudiante
const createStudent = async (studentData) => {
  try {
    const { id, nombres, apellidos, matricula, telefono, sexo, fechanacimiento, licenciatura } = studentData;
    await pool.query(
      'INSERT INTO alumnos (id, nombres, apellidos, matricula, telefono, sexo, fechanacimiento, licenciatura) values ($1,$2,$3,$4,$5,$6,$7,$8)',
      [id, nombres, apellidos, matricula, telefono, sexo, fechanacimiento, licenciatura]
    );
    return 'Estudiante creado exitosamente';
  } catch (error) {
    throw error;
  }
};

// Actualizar un estudiante existente
const updateStudent = async (id, studentData) => {
  try {
    const { nombres, apellidos, matricula, telefono, sexo, fechanacimiento, licenciatura } = studentData;
    await pool.query(
      'UPDATE alumnos SET nombres=$1, apellidos=$2, matricula=$3, telefono=$4, sexo=$5, fechanacimiento=$6, licenciatura=$7 WHERE id=$8',
      [nombres, apellidos, matricula, telefono, sexo, fechanacimiento, licenciatura, id]
    );
    return 'Estudiante actualizado exitosamente';
  } catch (error) {
    throw error;
  }
};

// Eliminar un estudiante existente
const deleteStudent = async (id) => {
  try {
    await pool.query('DELETE FROM alumnos WHERE id = $1', [id]);
    return 'Estudiante eliminado exitosamente';
  } catch (error) {
    throw error;
  }
};

const verificarCuenta=async(cuenta)=>{
  try {
    const {correo,contrasena}=cuenta;
    const res=await pool.query("SELECT id FROM cuentas_alumno WHERE correo = $1 AND contrasena = $2 ",[correo,contrasena]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  verificarCuenta
};
