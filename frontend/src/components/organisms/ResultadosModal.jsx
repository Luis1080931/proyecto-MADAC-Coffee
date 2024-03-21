import React from 'react'
import { useState } from 'react'
import { FaX } from "react-icons/fa6";
import LogoProyecto from './../../assets/logoProyeccto-removebg.png'

function ResultadosModal ({ open, onClose }){

    return (
      <>

      {open && (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='bg-[#E6E6E6] p-5 rounded-xl flex justify-center gap-3 lg:w-1/2 w-[90%] h-[90%] z-50'>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                <label className='text-xl font-bold'> Fecha: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
              </div>
              <div className='flex-col md:flex'  >
                <label className='text-xl font-bold'> Analisis: </label>
                <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                  <option value="">Código del analisis</option>
                  <option value="">1</option>
                </select>
              </div>
              <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Variable: </label>
                <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                  <option value="">Código de la variable</option>
                  <option value="">1</option>
                </select>
              </div>
              <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Valor: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese la valor' />
              </div>
              <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Observaciones: </label>
                <textarea className='p-2 rounded-lg w-80' ame="" id="" cols="30" rows="3" placeholder='Observaciones'></textarea>
              </div>
              <div className='flex-col md:flex justify-center mt-5 items-center'>
                <button className='bg-[#39A900] w-32 p-2 rounded-lg text-white font-bold text-xl' type="button"> Registrar </button>
              </div>
            </div>
            <div className='flex justify-center items-center w-[60%] h-[60%] mt-24 '>
              <img src={LogoProyecto} alt="" />
            </div>
            <div>
              <FaX className='cursor-pointer' onClick={onClose} />
            </div>
          </div>
        </div>
      )

      }
      </>
    )
} 

export default ResultadosModal

      /* <Modal open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='flex justify-center items-center'>
          <div className='lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col'>
              <div className='flex justify-end'>
                  <FaX className='hover:text-primary transition-all' onClick={() => onClose()} />
              </div>
              <div className='w-full flex flex-col gap-5'>
                  <h1 className='font-semibold text-primary text-xl'>Crear usuario nuevo</h1>
                  <form method='post' className='flex flex-col gap-5' onSubmit={handleSubmit}>
                      <div className='flex flex-row gap-3 w-full'>
                          <div className='flex flex-col gap-3 w-1/2'>
                              <label htmlFor="id">Identificación</label>
                              <input type="number" name='id' placeholder='Número de documento' className='p-2 border border-gray-400 rounded-lg' required onKeyDown={handleKeyDown} ref={id}  />
                          </div>
                          <div className='flex flex-col gap-3 w-1/2'>
                              <label htmlFor="name">Nombre Completo</label>
                              <input type="text" name='name' placeholder='Nombre Completo' className='p-2 border border-gray-400 rounded-lg' required ref={name} />
                          </div>
                      </div>
                      <div className='flex flex-row gap-3 w-full'>
                          <div className='flex flex-col gap-3 w-1/2'>
                              <label htmlFor="email">Correo</label>
                              <input type="email" name='email' placeholder='Correo Electrónico' className='p-2 border border-gray-400 rounded-lg' required ref={email} />
                          </div>
                          <div className='flex flex-col gap-3 w-1/2'>
                              <label htmlFor="phone">Telefono</label>
                              <input type="number" name='phone' placeholder='Teléfono' className='p-2 border border-gray-400 rounded-lg' onKeyDown={handleKeyDown} ref={phone} />
                          </div>
                      </div>
                      <button type='submit' className='py-2 bg-primary text-white rounded-lg hover:scale-105 transition-all'>Crear Usuario</button>
                  </form>
              </div>
          </div>
      </Modal> */
  


/* 
   function handleModal(Registrar){
      setModal(true)
      setTitle(Registrar)
    }

    function handleClose (){
      setModal(false)
    } 

 return (
    <div>
    {showModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 border-2 border-gray-700"> 
      <div className="bg-white p-8 rounded-lg w-96 ">
        <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2> 
         <form className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2">
              <label htmlFor="usuario" className="block font-bold">
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              >
                <option value="">Seleccionar</option>
                {opcionesUsuario.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="nombres" className="block font-bold">
                Nombres
              </label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellidos" className="block font-bold">
                Apellidos
              </label>
              <input
                type="text"
                id
                htmlFor="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="correo" className="block font-bold">
                Correo
              </label>
              <input
                type="text"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="finca" className="block font-bold">
                Finca
              </label>
              <input
                type="text"
                id="finca"
                name="finca"
                value={formData.finca}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rol" className="block font-bold">
                Rol
              </label>
              <input
                type="text"
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
           
            <div className="col-span-2 flex justify-end ">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Enviar
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
} */
  
