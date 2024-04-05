import React from 'react'
import LogoProyecto from './../../assets/logoProyeccto-removebg.png'

export const Logo = () => {
  return (
    <div className='flex justify-center items-center w-[60%] h-[60%] mt-24 '>
        <img src={LogoProyecto} alt="" />
    </div>
  )
}