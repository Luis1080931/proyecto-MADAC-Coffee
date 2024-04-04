import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/logoProyeccto-removebg.png'

export const VariedadesRegistrar = () => {
  return (
    <div>
        <HeaderRegis title='Registrar las variedades' />
        <div className='flex'>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
                <form action="#">
                   
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Variedad: </label>
                        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                            <option value="">Seleccione la variedad</option>
                            <option value="">Castillo</option>
                            <option value="">Borbón rosado</option>
                        </select>
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
