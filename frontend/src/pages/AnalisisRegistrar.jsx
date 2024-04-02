import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/logoProyeccto-removebg.png'

export const AnalisisRegistrar = () => {
  return (
    <div>
        <HeaderRegis title='Registrar Analisis' />
        <div className='flex'>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
                <form action="#">
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Fecha: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
                    </div>
                    <div className='flex flex-col m-5'  >
                        <label className='text-xl font-bold'> Analista: </label>
                        <select name="" id="" className='p-2 rounded-lg'>
                            <option value="">Código del analista</option>
                            <option value="">10330</option>
                        </select>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Muestra: </label>
                        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                            <option value="">Código de la muestra</option>
                            <option value="">21</option>
                        </select>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Tipo De Análisis: </label>
                        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                            <option value="">Seleccione el tipo de Análisis</option>
                            <option value="">Físico</option>
                            <option value="">Sensorial</option>
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
