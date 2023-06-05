const express= require('express');
const router=express.Router();
const estudiantesController= require("../../controllers/estudiantesController")

router
    .get('/',estudiantesController.getOneStudent)
    .post('/',estudiantesController.createStudent)
    .patch('/:studentId',estudiantesController.updateStudent)
    .delete('/:studentId',estudiantesController.deleteStudent)
    .post("/IniciarSesion", estudiantesController.IniciarSesion)
    .post("/generarToken", estudiantesController.generarToken);

module.exports=router;