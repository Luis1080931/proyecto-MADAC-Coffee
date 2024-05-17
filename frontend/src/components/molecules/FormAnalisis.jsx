import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';
import AnalisisContext from '../../context/AnalisisContext';

const FormAnalisis = ({ handleSubmit, actionLabel, mode, initialData, onClose }) => {

  const [formData, setFormData] = useState({
    fecha: '',
    analista: '',
    fk_muestra: '',
    fk_tipo_analisis: ''
  })

  const { analisisId } = useContext(AnalisisContext)

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
    if (mode === 'update' && analisisId && analisisId.fecha) {
      const fechaDate = new Date(analisisId.fecha);
      if (!isNaN(fechaDate.getTime())) {
        const formattedDate = fechaDate.toISOString().split('T')[0];
        setFormData({
          fecha: formattedDate,
          analista: analisisId.analista,
          fk_muestra: analisisId.fk_muestra,
          fk_tipo_analisis: analisisId.fk_tipo_analisis
        })
      } else {
        console.error('initialData.fecha no es una instancia válida de Date');
      }
    }
    
  }, [mode, analisisId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      
      const {fecha, analista, fk_muestra, fk_tipo_analisis } = formData

      const data = {
        fecha: fecha,
        analista: analista,
        fk_muestra,
        fk_tipo_analisis
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log('Error de submit' + error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required={true}
            label="Ingrese la fecha"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
          <Select
            label="Seleccione el analista"
            name="analista"
            value={formData.analista}
            onChange={handleChange}
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
            value={formData.fk_muestra}
            onChange={handleChange}
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
            value={formData.fk_tipo_analisis}
            onChange={handleChange}
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
