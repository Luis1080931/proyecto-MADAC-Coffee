import React, { useState } from 'react'
import { HeaderLogin } from '../components/HeaderLogin.jsx'
import LogoProyecto from './../assets/icons/logoProyeccto-removebg.png'
import Fondo from './../assets/icons/fondoLogin.jpg'
import './../App.css'
import { Link } from 'react-router-dom'

export const Login = () => {

    const [login, setLogin] = useState(false)

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
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg' onClick={showLogin}>
            <form action="#" onClick={showLogin}>
                    <div className='flex flex-col items-center justify-center m-5'>
                        <label className='text-2xl font-bold'>Inicio de sesión</label>
                    </div>

                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Correo: </label>
                        <input className='p-2 rounded-lg w-60 h-12' type="text" value="" placeholder='Ingrese su Correo' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Contraseña: </label>
                        <input className='p-2 rounded-lg w-60 h-12' type="password" value="" placeholder='Ingrese su Contraseña' />
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <button className='bg-[#39A900] w-36 p-2 rounded-lg text-white font-bold text-xl' type="button"><Link to='/dashboard'> Iniciar sesión </Link></button>
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
