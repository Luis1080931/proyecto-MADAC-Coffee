import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';

const FormVariables = ({ actionLabel , handleSubmit, initialdata, mode, onClose}) => {

  const nombre = useRef(null)
  const fk_tipo_analisis = useRef(null)

  const [errors, setErrors] = useState({
    nombre: '',
    fk_tipo_analisis: ''
  })
  const [tipoAnalisis, setTipoAnalisis] = useState([])

  useEffect(() => {
    axiosClient.get('/tipoanalisis/listar').then((response) => {
      console.log(response.data)
      setTipoAnalisis(response.data)
    })
  }, [])

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
            <Input
              type="text"
              label='Ingrese el nombre de la variable'
              id='nombre'
              name="nombre"
              ref={nombre}
              required={true}
              />
              {errors.nombre&& <span className='text-red-500'>{errors.nombre}</span>}
              </div>
          <div className='flex-col md:fle'>
              <label className='text-xl font-bold'>tipo de análisis</label>
              <Select label='Seleccione el tipo de análisis' ref={fk_tipo_analisis} required={true}>
                {tipoAnalisis.map(tipo => (
                  <SelectItem key={tipo.id} value={tipo.id}>
                    {tipo.tipo_analisis}
                  </SelectItem>
                ))}
              </Select>
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
