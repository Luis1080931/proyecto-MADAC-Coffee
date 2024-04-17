import React, { useEffect, useRef, useState } from 'react';
import { Button } from './../atoms/Button.jsx';

const FormVariables = ({ actionLabel , handleSubmit, initialdata, mode}) => {

  const nombre = useRef(null)
  const fk_tipo_analisis = useRef(null)

  const [errors, setErrors] = useState({
    nombre: '',
    fk_tipo_analisis: ''
  })

  useEffect (()=>{
    if(mode == 'update' && initialdata) {
      nombre.current.value = initialdata.nombre 
      fk_tipo_analisis.current.value = initialdata.fk_tipo_analisis
    }
  }, [mode, initialdata])

  const handleFormSubmit  = async (e) => {
    e.preventDefault();

   
      const data = {
        nombre: nombre.current.value ,
        fk_tipo_analisis: fk_tipo_analisis.current.value
      }
      let hasErrors = false;
      const newErrors = { ...errors};

      //Validación de Campos correctos 
      if(!data.nombre || !/^[a-zA-Z\s]+$/.test(data.nombre)) {
        newErrors.nombre = 'El nombre de la variable debe contener solo letras';
        hasErrors = true
      }
      if ( !data.fk_tipo_analisis || isNaN(data.fk_tipo_analisis) || data.fk_tipo_analisis <= 0) {
        newErrors.hasErrors = 'El valor de fk debe ser de numerico entero positivo';
        hasErrors = true
      }
 
      setErrors(newErrors);
      if (hasErrors) {
        return;
      }
      try {
      handleSubmit(data, e)
    } catch (error) {
      console.log('Error al conectar con el server ' + error);
    }

  };

  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
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
              {errors.nombre&& <span className='text-red-500'>{errors.nombre}</span>}
              </div>
          <div className='flex-col md:fle'>
              <label className='text-xl font-bold'>tipo de análisis</label>
              <input
              className='p-2 rounded-lg w-80 h-12'
              type="number"
              placeholder='Ingrese Tipo de analisis'
              name="fk_tipo_analisis"
              ref={fk_tipo_analisis}
              required= {true}
            />
            {errors.fk_tipo_analisis && <span className='text-red-500'>{errors.fk_tipo_analisis}</span>}
            </div>
          <Button actionLabel={actionLabel} />
      </form>
    </>
  );
};

export default FormVariables;
