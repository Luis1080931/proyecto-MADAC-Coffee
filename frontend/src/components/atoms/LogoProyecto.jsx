import React from 'react'
import LogoProyecto from './../../assets/icons/logoProyeccto-removebg.png'
import TitleModal from './TitleModal'

export const Logo = ({ title }) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center max-w-[60%] max-h-[60%]'>
        <TitleModal title={title} />
        <img src={LogoProyecto} alt="" />
      </div>
    </>
    
  )
}