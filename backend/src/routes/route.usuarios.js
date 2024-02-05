// const express = require('express')

import  express  from "express";
const router=express.Router()
import getUsuarios from "../controllers/controller.usuarios.js"

// router.get('/user',(req,res)=>{
//     res.json("testing api")
// });

router.get('/db/user', async (req, res) => {
    try {
      await getUsuarios(req, res);
    } catch (error) {
      console.error('Error en la ruta /db/user:', error);
      res.status(500).json({ error: 'Error en la ruta /db/user' });
    }
  });

export default  router;