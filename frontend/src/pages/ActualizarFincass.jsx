import React from 'react'
import { HeaderRegis } from '../components/HeaderRegis.jsx'
import LogoSena from './../assets/Logosimbolo-SENA-PRINCIPAL.png'
import LogoProyecto from './../assets/logoProyeccto-removebg.png'

export const ActualizarFincas = () => {
  return (
    <div>
        <HeaderRegis title='Actualizar Fincas' />
        <div className='flex'>
            <div className='w-5/12 flex justify-center items-center ml-20'>
                <img src={LogoProyecto} alt="" />
            </div>
            <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
                <form action="#">
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> dimension_mt2: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="number" value="" placeholder='Ingrese las dimensiones de la finca' />
                    </div>
                    <div className='flex flex-col m-5'  >
                        <label className='text-xl font-bold'> Caficultor: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="number" value="" placeholder='Ingrese el id del caficultor' />
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Municipio: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese el municipio' />

                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Vereda: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese la vereda' />
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
