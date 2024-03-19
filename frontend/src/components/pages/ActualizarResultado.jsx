import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/logoProyeccto-removebg.png'

export const ActualizarResultado = () => {
  return (
    <div>
        <HeaderRegis title='Actualizar resultados' />
        <div className='flex'>
            <div className='w-5/12 flex justify-center items-center ml-20'>
                <img src={LogoProyecto} alt="" />
            </div>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
                <form action="#">
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Fecha: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
                    </div>
                    <div className='flex flex-col m-5'  >
                        <label className='text-xl font-bold'> Analisis: </label>
                        <select name="" id="" className='p-2 rounded-lg'>
                            <option value="">Código del analisis</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Variable: </label>
                        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                            <option value="">Código de la variable</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Valor: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese la valor' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Observaciones: </label>
                        <textarea className='p-2 rounded-lg' ame="" id="" cols="30" rows="3" placeholder='Observaciones'></textarea>
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
