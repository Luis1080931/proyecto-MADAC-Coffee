import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/icons/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/icons/logoProyeccto-removebg.png'

export const ActualizarVariables = () => {
  return (
    <div>
        <HeaderRegis title='Actualizar Variables' link='/Variables' />
        <div className='flex'>
            <div className='w-5/12 flex justify-center items-center ml-20'>
                <img src={LogoProyecto} alt="" />
            </div>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
                <form action="#">
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Nombre </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese nombre' />
                    </div>
                    <div className='flex flex-col m-5'  >
                        <label className='text-xl font-bold'> fk tipo de analisis </label>
                        <select name="" id="" className='p-2 rounded-lg'>
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <button className='bg-[#39A900] w-32 p-2 rounded-lg text-white font-bold text-xl' type="button">Actualizar</button>
                    </div>
                </form>
                
            </div>
        </div>
        <div className='w-32 flex justify-end items-end h-12'>
            <img src={LogoSena} alt="" />
        </div>
    </div>
  )
}
