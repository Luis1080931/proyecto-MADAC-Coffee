import React from 'react'
import { Header } from '../components/Header.jsx'
import LogoSena from './../assets/icons/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/icons/logoProyeccto-removebg.png'

export const Login = () => {
  return (
    <div>
        <Header title="MADAC-Coffee" />
        <div className='flex'>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
            <form action="#">
                    <div className='flex flex-col items-center justify-center m-5'>
                        <label className='text-2xl font-bold'>Inicio de sesión</label>
                    </div>

                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Correo: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese su Correo' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Contraseña: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="password" value="" placeholder='Ingrese su Contraseña' />
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <button className='bg-[#39A900] w-32 p-2 rounded-lg text-white font-bold text-xl' type="button">Registrar</button>
                    </div>
                </form>
                
            </div>
            <div className='w-5/12 flex justify-center items-center ml-20'>
                <img src={LogoProyecto} alt="" />
            </div>
        </div>
        <div className='w-32 flex justify-end items-end ml-auto h-12'>
            <img src={LogoSena} alt="" />
        </div>
    </div>
  )
}
