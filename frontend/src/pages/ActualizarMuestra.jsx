import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/icons/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/icons/logoProyeccto-removebg.png'

export const ActualizarMuestras = () => {
  return (
    <div>
        <HeaderRegis title='Actualizar Muestras' link = '/Muestras'/>
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
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Cantidad: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="float" value="" placeholder='Ingrese la Cantidad' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'>Quien recibe: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese su nombre' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Proceso de fermentación: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="Number" value="" placeholder='Ingrese el proceso de fermentación' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Humedad del cafe: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="float" value="" placeholder='Ingrese la humedad del cafe' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Altura MSNM: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="float" value="" placeholder='Ingrese la altura ' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Tipo de secado: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese el tipo de secado' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Observaciones: </label>
                        <textarea className='p-2 rounded-lg' ame="" id="" cols="30" rows="3" placeholder='Observaciones'></textarea>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> fk lote: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="Number" value="" placeholder='Ingrese la fk del lote' />
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
