import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/icons/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/icons/logoProyeccto-removebg.png'

export const RegistrarResultados = () => {
  return (
    <div>
        <HeaderRegis title='Registrar resultados' link='/resultados' />
        <div className='w-[100%] flex md:flex md:rounded-2xl'>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 m-16 rounded-lg md:grid md:rounded-2xl md:w-4/12 md:content-center'>
                <form action="#" className='flex-col md:flex md:rounded-2xl md:w-1/2'>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Fecha: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
                    </div>
                    <div className='flex-col m-5 md:flex'  >
                        <label className='text-xl font-bold'> Analisis: </label>
                        <select name="" id="" className='p-2 rounded-lg'>
                            <option value="">Código del analisis</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    <div className='flex-col m-5 md:flex'>
                        <label className='text-xl font-bold'> Variable: </label>
                        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                            <option value="">Código de la variable</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    <div className='flex-col m-5 md:flex'>
                        <label className='text-xl font-bold'> Valor: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese la valor' />
                    </div>
                    <div className='flex-col m-5 md:flex'>
                        <label className='text-xl font-bold'> Observaciones: </label>
                        <textarea className='p-2 rounded-lg w-80 ' ame="" id="" cols="30" rows="3" placeholder='Observaciones'></textarea>
                    </div>
                    <div className='flex-col m-5 md:flex justify-center items-center'>
                        <button className='bg-[#39A900] w-32 p-2 rounded-lg text-white font-bold text-xl' type="button">Registrar</button>
                    </div>
                    
                    
                </form>
                
            </div>
            <div className='w-5/12 flex justify-center items-center ml-20 md:grid md:rounded-2xl md:content-center'>
                <img src={LogoProyecto} alt="" />
            </div>
        </div>
        <div className='w-32 flex justify-end items-end ml-auto h-12'>
            <img src={LogoSena} alt="" />
        </div>
    </div>
  )
}