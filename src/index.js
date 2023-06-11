const express= require('express');
const v1StudentRouter=require("./v1/routes/estudiantesRoutes");
require('dotenv').config();

const app= express();
const PORT= process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/estudiantes",v1StudentRouter);

app.listen(PORT,()=>{console.log(`Server listening on port ${PORT}`)});