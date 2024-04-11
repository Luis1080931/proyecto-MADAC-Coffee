import React from 'react'
import NavbarItem from '../molecules/NavbarItem'




function Navbar2({titulo}) {

    const userNombre = "Maria"

    const textoModificado = "Administrador"



  return (
    <>
         <div className='w-full flex fixed md:sticky lg:z-20  right-0 justify-center lg:justify-between items-center h-16 bg-white shadow-lg  px-5'>
                <div className='lg:flex hidden items-center gap-10'>
                    <div className='flex z-10 items-center relative justify-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPodEp1Zyixlyx1Rrq6JJlPm0hgg1pFeLNrxgt2bkYw&s" alt="" className='w-14 h-14 rounded-full' />
                        <div className='flex flex-col justify-end gap-y-0'>
                            <span className='uppercase font-bold'>
                                {userNombre}
                            </span>
                            <span className='text-gray-500'>
                                {textoModificado}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='font-extrabold w-44 text-2xl text-gray-600 hidden md:flex'>
                    <span>{titulo}</span>
                </div>

                <div className='flex items-center justify-center gap-2'>
                    <NavbarItem icon="alert-circle-outline" />
                    <NavbarItem icon="log-out-outline" />
                </div>
            </div>
    </>
  )
}

export default Navbar2