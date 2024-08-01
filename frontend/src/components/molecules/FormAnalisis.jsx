import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';
import AnalisisContext from '../../context/AnalisisContext';

const FormAnalisis = ({ handleSubmit, actionLabel, mode, onClose }) => {

  
  const [fecha, setFecha] = useState('') 
  const [analista, setAnalista] = useState('')
  const [muestra, setMuestra] = useState('')
  const [tipo, setTipo] = useState('')

  const { analisisId } = useContext(AnalisisContext)

  const [catadores, setCatadores] = useState([]);
  const [muestras, setMuestras] = useState([]);
  const [tipoAnalisis, setTipoAnalisis] = useState([]);

  useEffect(() => {
    axiosClient.get('/usuarios/catadores').then((response) => {
      setCatadores(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/muestras/activas').then((response) => {
      setMuestras(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/tipoanalisis/listar').then((response) => {
      setTipoAnalisis(response.data);
    });
  }, []);

  useEffect(() => {
    if (mode === 'update' && analisisId ) {
      
        setFecha(analisisId.fecha ? new Date(analisisId.fecha).toISOString().split('T')[0] : '')
        setAnalista(analisisId.identificacion)
        setMuestra(analisisId.muestra)
        setTipo(analisisId.codeTipo)
      
    }
    
  }, [mode, analisisId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {

      const data = {
        fecha: fecha,
        analista: parseInt(analista),
        fk_muestra: muestra,
        fk_tipo_analisis: parseInt(tipo)
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log('Error de submit' + error);
    }
  }

  return (
    <>
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Input
            type="date"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required={true}
            label="Ingrese la fecha"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <select
            label="Seleccione el analista"
            name="analista"
            className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
            value={analista}
            onChange={(e) => setAnalista(e.target.value)}
            required={true}
            selectionMode="single"
          >
            <option value="" hidden> Seleccione el catador ... </option>
            {catadores.map(item => (
              <option key={item.identificacion} value={item.identificacion} >
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <select
            label="Seleccione la muestra"
            name="fk_muestra"
            className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
            value={muestra}
            onChange={(e) => setMuestra(e.target.value)}
            required={true}
          >
            <option value="" hidden> Codigo de muestra  ... </option>
            {muestras.map(mues => (
              <option key={mues.codigo} value={mues.codigo} >
                {mues.codigo} - {mues.nombre_finca}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <select
            label="Tipo de análisis"
            placeholder="Seleccione el tipo de análisis"
            className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
            name="fk_tipo_analisis"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required={true}
          >
            <option value="" hidden> Tipo de analisis ...</option>
            {tipoAnalisis.map(tipo => (
              <option key={tipo.id} value={tipo.id} >
                {tipo.tipo_analisis}
              </option>
            ))}
          </select>
        </div>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <Button type="submit" className='bg-[#273468] text-white'>
            {actionLabel}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default FormAnalisis;
