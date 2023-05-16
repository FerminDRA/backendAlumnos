const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/alumnos', db.getAlumnos)
app.get('/alumnos/:id', db.getAlumnosById)
app.post('/alumnos', db.createAlumnos)
app.put('/alumnos/:id', db.updateAlumnos)
app.delete('/alumnos/:id', db.deleteAlumnos)