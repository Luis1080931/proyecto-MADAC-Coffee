import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button } from '@nextui-org/react';

const FormVariables = ({ actionLabel , handleSubmit, initialdata, mode, onClose}) => {

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

   
      const datosForm = {
        nombre: nombre.current.value ,
        fk_tipo_analisis: parseInt(fk_tipo_analisis.current.value)
      }
      let hasErrors = false;
      const newErrors = { ...errors};

      //Validación de Campos correctos 
      if(!datosForm.nombre || !/^[a-zA-Z\s]+$/.test(datosForm.nombre)) {
        newErrors.nombre = 'El nombre de la variable debe contener solo letras';
        hasErrors = true
      }
      if ( !datosForm.fk_tipo_analisis || isNaN(datosForm.fk_tipo_analisis) || datosForm.fk_tipo_analisis <= 0) {
        newErrors.hasErrors = 'El valor de fk debe ser de numerico entero positivo';
        hasErrors = true
      }
 
      setErrors(newErrors);
      if (hasErrors) {
        return;
      }
      try {
      handleSubmit(datosForm, e)
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
              id='nombre'
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
              id='fk_tipo_analisis'
              name="fk_tipo_analisis"
              ref={fk_tipo_analisis}
              required= {true}
            />
            {errors.fk_tipo_analisis && <span className='text-red-500'>{errors.fk_tipo_analisis}</span>}
            </div>
            <ModalFooter>
                <Button 
                color='danger' 
                variant='flat' 
                onPress={onClose}
              >
                Close
                </Button>
                <Button
                type='submit' color='primary'
                >
                {actionLabel}
                </Button>
            </ModalFooter>
      </form>
    </>
  );
};

export default FormVariables;
