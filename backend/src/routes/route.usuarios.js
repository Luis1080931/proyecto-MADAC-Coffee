// const express = require('express')

import  express  from "express";
const router=express.Router()
import getUsuarios from "../controllers/controller.usuarios.js"
import controllerUsuarios from "../controllers/controller.usuarios.js";

router.get('/user',(req,res)=>{
    res=controllerUsuarios.getUsuarios
});



export default  router;