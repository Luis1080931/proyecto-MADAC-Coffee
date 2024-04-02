import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RegistrarLotes } from "./pages/RegistrarLotes.jsx"
import { ActualizarLotes } from "./pages/ActualizarLotes.jsx"
import { Lotes } from "./pages/Lotes.jsx"
import { ActualizarFincas } from "./pages/ActualizarFincass.jsx"
import { RegistrarFincas } from "./pages/RegistrarFincass.jsx"
import { Fincas } from "./pages/Fincass.jsx"

function App() {

  return (
    <BrowserRouter>    
     { <Fincas/>}

    </BrowserRouter>

  )
}

export default App
/**import axios from 'axios';
import './App.css';
import React,{useState,useEffect} from 'react';
const baseURL = "http://localhost:3000/usuarios/registrar";

export default function App() {
  const[post,setUsuario]=useState({
    identificacion:'',
    telefono:'',
    nombre:'',
    correo_electronico:'',
    tipo_usuario:'',
    estado:''
  });
  useEffect(()=>{
    axios.get(baseURL).then((response)=>{
      console.log(response)
      setget(response.data);
    });
  },[])
  if(!get)return null

  return(
   <form action="">
    <input type="text"/>
    <input type="text" />
   </form>
  )
}

/*
<img src={get.sprites.front_shiny} alt='{get.name}' />
    <h2>Nombre:{post.status} </h2>
    <h2>Altura:{post.height} </h2>
    <h2>Peso:{post.weight} </h2>
    <h2>Tipo:{post.types.map((type)=>type.type.name).join(", ")} </h2>
    */ 