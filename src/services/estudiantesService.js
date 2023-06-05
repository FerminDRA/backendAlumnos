const Estudiante=require('../database/Estudiantes')

const getAllStudents=()=>{
    const allStudents=Estudiante.getAllStudents();
    return allStudents;
};
const getOneStudent=(id)=>{
    const oneStudent=Estudiante.getOneStudent(id);
    return oneStudent;
};
const createStudent=(newStudent)=>{
    const createStudent=Estudiante.createStudent(newStudent);
    return createStudent;
};
const updateStudent=()=>{
    //const up
    return ;
};
const deleteStudent=()=>{
    return ;
};

const verificarCuenta=(cuenta)=>{
    const cuentaVer=Estudiante.verificarCuenta(cuenta);
    return cuentaVer;
};

module.exports={
    getAllStudents,
    getOneStudent,
    createStudent,
    verificarCuenta
}