import React, { useState, useRef } from 'react'
import { HeaderLogin } from './../molecules/HeaderLogin.jsx'
import LogoProyecto from './../../assets/icons/logoProyeccto-removebg.png'
import './../../App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {

    const [login, setLogin] = useState(false)

    const baseURL = "http://localhost:3000/validacion"


const correo_electronico = useRef(null)
const password = useRef(null)
const navigate = useNavigate()

const handleSubmit = (e) => {

e.preventDefault()

try {
  const data = {
    correo_electronico: correo_electronico.current.value,
    password: password.current.value
  }
  
  axios.post(baseURL, data).then((response) => {
    console.log(response)
    if(response.status === 404){
      alert('Credenciales erroneas')
    }else{
      const {token} = response.data
      localStorage.setItem('token', token)
      navigate('/dashboard')
      alert('Logueado')
    }
  })
} catch (error) {
  console.log(error)
  alert('Error del servidor' + error)
}
    
}

    const showLogin = () => setLogin(!login)

  return (
    <div className='fondo'>
        <HeaderLogin title="MADAC-Coffee" />

        <div className='w-11/12 flex justify-end items-end mt-5'>
            <button className='w-28 p-2 rounded-lg bg-[#39A900] text-white font-bold text-xl z-10' onClick={showLogin}>
                Login
            </button>
        </div>
        
        <div className={login ? 'formLogin active' : 'formLogin'}>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
            <form method='post'>
                    <div className='flex flex-col items-center justify-center m-5'>
                        <label className='text-2xl font-bold'>Inicio de sesión</label>
                    </div>

                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Correo: </label>
                        <input className='p-2 rounded-lg w-60 h-12' type="text" placeholder='Ingrese su Correo' ref={correo_electronico}/>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Contraseña: </label>
                        <input className='p-2 rounded-lg w-60 h-12' type="password" placeholder='Ingrese su Contraseña' ref={password} />
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <button className='bg-[#39A900] w-36 p-2 rounded-lg text-white font-bold text-xl' type="button" onClick={handleSubmit}>Iniciar sesión</button>
                    </div>
                </form>

                <div className='w-5/12 flex justify-center items-center'>
                    <img src={LogoProyecto} alt="" />
                </div>
                
            </div>
            
        </div>
        
    </div>
  )
}
