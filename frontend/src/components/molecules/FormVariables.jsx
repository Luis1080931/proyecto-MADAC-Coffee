import React, { useContext, useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';
import VariablesContext from './../../context/VariablesContext.jsx'

const FormVariables = ({ actionLabel , handleSubmit, mode, onClose}) => {

  const [nombre, setNombre] = useState('')
  const [analisisType, setAnalisisType] = useState('')
  const [tipoAnalisis, setTipoAnalisis] = useState([])
  const { variableId } = useContext(VariablesContext)
  
  useEffect(() => {
    axiosClient.get('/tipoanalisis/listar').then((response) => {
      setTipoAnalisis(response.data)
    })
  }, [])

  useEffect (()=>{
    if(mode == 'update' && variableId) {
      setNombre(variableId.nombre)
      setAnalisisType(variableId.tipo_analisis)
    }
    console.log(variableId.tipo_analisis);
  }, [mode, variableId])

  const handleFormSubmit  = async (e) => {
    e.preventDefault();
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
            
              </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <select name='analisisType' label='Seleccione el tipo de análisis' value={analisisType} onChange={(e) => setAnalisisType(e.target.value)} required={true}>
                {tipoAnalisis.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.tipo_analisis}
                  </option>
                ))}
              </select>
           
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
