const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'estudiantes',
  password: 'postgres',
  port: 5432,
})

const getAlumnos = (request, response) => {
  pool.query('SELECT * FROM alumnos ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAlumnosById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM alumnos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAlumnos = (request, response) => {
  const { id,nombre,apellidoP,apellidoM,matricula,correo,contrasena } = request.body

  pool.query('INSERT INTO alumnos (id,nombre,apellidoP,apellidoM,matricula,correo,contrasena ) VALUES ($1, $2,$3, $4, $5, $6, $7)', [id,nombre,apellidoP,apellidoM,matricula,correo,contrasena ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Alumno added with ID: ${results.insertId}`)
  })
}

const updateAlumnos = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE alumnos SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteAlumnos = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM alumnos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getAlumnos,
  getAlumnosById,
  createAlumnos,
  updateAlumnos,
  deleteAlumnos,
}