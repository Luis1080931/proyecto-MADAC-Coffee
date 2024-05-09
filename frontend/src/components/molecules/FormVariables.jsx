import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';

const FormVariables = ({ actionLabel , handleSubmit, initialdata, mode, onClose}) => {

  const [nombre, setNombre] = useState('')
  const [analisisType, setAnalisisType] = useState('')
  const [tipoAnalisis, setTipoAnalisis] = useState([])

  const [errors, setErrors] = useState({
    nombre: '',
    fk_tipo_analisis: ''
  })
  

  useEffect(() => {
    axiosClient.get('/tipoanalisis/listar').then((response) => {
      console.log(response.data)
      setTipoAnalisis(response.data)
    })
  }, [])

  useEffect (()=>{
    if(mode == 'update' && initialdata) {
      setNombre(initialdata.nombre)
      setAnalisisType(initialdata.fk_tipo_analisis)
    }
  }, [mode, initialdata])

  const handleFormSubmit  = async (e) => {
    e.preventDefault();

      /* let hasErrors = false;
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
      } */
      try {
        const datosForm = {
          nombre: nombre,
          fk_tipo_analisis: parseInt(analisisType)
        }
      handleSubmit(datosForm, e)
    } catch (error) {
      console.log('Error al conectar con el server ' + error);
    }

  }

  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
            <Input
              type="text"
              label='Ingrese el nombre de la variable'
              id='nombre'
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={true}
              />
              {errors.nombre&& <span className='text-red-500'>{errors.nombre}</span>}
              </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Select label='Seleccione el tipo de análisis' value={analisisType} onChange={(e) => setAnalisisType(e.target.value)} required={true}>
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
