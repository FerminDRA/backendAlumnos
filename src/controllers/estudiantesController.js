const estudiantesService=require("../services/estudiantesService")
const jwt = require("jsonwebtoken");
require('dotenv').config();


const getAllStudents=async(req,res)=>{
    const allStudents= await estudiantesService.getAllStudents();
    res.send({status:'OK',data:allStudents});
};

const getOneStudent=async(req,res)=>{
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const studentId = decodedToken.id;
        const student = await estudiantesService.getOneStudent(studentId);
        res.send({ status: 'OK', data: student });
      } catch (error) {
        res.status(500).send({ status: 'Error', message: 'Error al obtener el estudiante' });
      }
};

const createStudent=async(req,res)=>{
    const {body}=req
    if (
        !body.id||
	    !body.nombres||
	    !body.apellidos||
	    !body.matricula||
	    !body.telefono||
	    !body.sexo||
	    !body.fechanacimiento||
	    !body.licenciatura
        ){
        return;
    }
    const newStudent={
        id:body.id,
        nombres:body.nombres,
        apellidos:body.apellidos,
        matricula:body.matricula,
        telefono:body.telefono,
        sexo:body.sexo,
        fechanacimiento:body.fechanacimiento,
        licenciatura:body.licenciatura,
    }
    const createdStudent= await estudiantesService.createStudent(newStudent);
    res.status(201).send({status:'OK',data:createdStudent});
};

const updateStudent=(req,res)=>{
    const updatedStudent= estudiantesService.updateStudent(req.params.studentId);
    res.send(`Update student ${req.params.studentId}`);
};

const deleteStudent=(req,res)=>{
    estudiantesService.deleteStudent(req.params.studentId);
    res.send(`Delete student ${req.params.studentId}`);
};

//Token
const generarToken = async (req, res) => {
    try {
      const valor = req.body;
      const token = jwt.sign({ Valor: valor }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//Inicio de sesion
const IniciarSesion = async (req, res) => {
    try {
        const { body } = req
        if (
            !body.correo ||
            !body.contrasena
        ) {
            return;
        }

        const cuenta={
            correo:body.correo,
            contrasena:body.contrasena
        }
        result = await estudiantesService.verificarCuenta(cuenta);

        if (result.length === 1) {
            const { id } = result[0];
            const token = jwt.sign(
                { id: id },
                process.env.JWT_SECRET
            );
            res.json({ token });
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        console.log("Hubo un error")
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getAllStudents,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    generarToken,
    IniciarSesion
}