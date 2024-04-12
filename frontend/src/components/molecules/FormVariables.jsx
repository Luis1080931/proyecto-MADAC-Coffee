import React, { useEffect, useRef } from 'react';
import { Button } from './../atoms/Button.jsx';

const FormVariables = ({ actionLabel , handleSubmit, initialdata, mode}) => {

  const nombre = useRef(null)
  const fk_tipo_analisis = useRef(null)

  useEffect (()=>{
    if(mode == 'update' && initialdata) {
      nombre.current.value = initialdata.nombre 
      fk_tipo_analisis.current.value = initialdata.fk_tipo_analisis
    }
  }, [mode, initialdata])

  const handleFormSubmit  = async (e) => {
    e.preventDefault();

    try {
      const data = {
        nombre: nombre.current.value ,
        fk_tipo_analisis: fk_tipo_analisis.current.value
      }
      handleSubmit(data, e)
    } catch (error) {
      console.log('no paila');
    }

  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <label className='text-x1 font-bold'>Nombre: </label>
            <input
              className='p-2 rounded-lg w-80 h-12'
              type="text"
              placeholder='Ingrese el nombre de la variable'
              name="nombre"
              ref={nombre}
              required={true}
            />
            <div className='flex-col md:flex'>
              <label className='text-xl font-bold'>tipo de análisis</label>
              <input
              className='p-2 rounded-lg w-80 h-12'
              type="number"
              placeholder='Ingrese Tipo de analisis'
              name="fk_tipo_analisis"
              ref={fk_tipo_analisis}
              required= {true}
            />
            </div>
          </div>
          <Button actionLabel={actionLabel} />
        </div>
      </form>
    </>
  );
};

export default FormVariables;
