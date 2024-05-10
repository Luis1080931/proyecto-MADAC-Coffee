import React, { useEffect, useState } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';

const FormAnalisis = ({ handleSubmit, actionLabel, mode, initialData, onClose }) => {

  const [fechaValue, setFechaValue] = useState('');
  const [analistaValue, setAnalistaValue] = useState('');
  const [muestraValue, setMuestraValue] = useState('');
  const [tipoAnalisisValue, setTipoAnalisisValue] = useState('');

  const [catadores, setCatadores] = useState([]);
  const [muestras, setMuestras] = useState([]);
  const [tipoAnalisis, setTipoAnalisis] = useState([]);

  useEffect(() => {
    axiosClient.get('/usuarios/catadores').then((response) => {
      console.log(response.data);
      setCatadores(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/muestras/activas').then((response) => {
      console.log(response.data);
      setMuestras(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/tipoanalisis/listar').then((response) => {
      setTipoAnalisis(response.data);
    });
  }, []);

  useEffect(() => {
    if (mode === 'update' && initialData && initialData.fecha) {
      const fechaDate = new Date(initialData.fecha);
      if (!isNaN(fechaDate.getTime())) {
        const formattedDate = fechaDate.toISOString().split('T')[0];
        setFechaValue(formattedDate);
        setAnalistaValue(initialData.analista);
        setMuestraValue(initialData.fk_muestra);
        setTipoAnalisisValue(initialData.fk_tipo_analisis);
      } else {
        console.error('initialData.fecha no es una instancia válida de Date');
      }
    }
    
  }, [mode, initialData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const fechaValues = new Date(fechaValue).toISOString().slice(0, 10);
      const data = {
        fecha: fechaValues,
        analista: analistaValue,
        fk_muestra: muestraValue,
        fk_tipo_analisis: tipoAnalisisValue
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log('Error de submit' + error);
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Input
            type="date"
            name="fecha"
            value={fechaValue}
            onChange={(e) => setFechaValue(e.target.value)}
            required={true}
            label="Ingrese la fecha"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Select
            label="Seleccione el analista"
            name="analista"
            value={analistaValue}
            onChange={(e) => setAnalistaValue(e.target.value)}
            required={true}
            selectionMode="single"
          >
            {catadores.map(item => (
              <SelectItem key={item.identificacion} value={item.identificacion} textValue={item.nombre}>
                {item.nombre}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Select
            label="Seleccione la muestra"
            name="fk_muestra"
            value={muestraValue}
            onChange={(e) => setMuestraValue(e.target.value)}
            required={true}
          >
            {muestras.map(mues => (
              <SelectItem key={mues.codigo} value={mues.codigo} textValue={mues.codigo}>
                {mues.codigo}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Select
            label="Tipo de análisis"
            placeholder="Seleccione el tipo de análisis"
            name="fk_tipo_analisis"
            value={tipoAnalisisValue}
            onChange={(e) => setTipoAnalisisValue(e.target.value)}
            required={true}
          >
            {tipoAnalisis.map(tipo => (
              <SelectItem key={tipo.id} value={tipo.id} textValue={tipo.tipo_analisis}>
                {tipo.tipo_analisis}
              </SelectItem>
            ))}
          </Select>
        </div>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <Button type="submit" color="primary">
            {actionLabel}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default FormAnalisis;
