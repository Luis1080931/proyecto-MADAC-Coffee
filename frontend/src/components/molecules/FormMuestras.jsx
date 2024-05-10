import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';

const FormMuestras = ({ actionLabel, handleSubmit, initialData, mode, onClose}) => {

    const [fecha, setFecha] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [quien_recibe, setQuienRecibe] = useState('')
    const [proceso, setProceso] = useState('')
    const [humedad, setHumedad] = useState('')
    const [altura, setAltura] = useState('')
    const [secado, setSecado] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [loteFk, setLoteFk] = useState('') 

    const [lotes, setLotes] = useState([])

    useEffect(() => {
      axiosClient.get('/lotes/activos').then((response) => {
        console.log(response.data)
        setLotes(response.data)
      })
    }, [])

    const [errors, setErrors] = useState({
      fecha: '',
      cantidad: '',
      quien_recibe: '',
      proceso_fermentacion: '',
      humedad_cafe: '',
      altura_MSNM: '',
      tipo_secado: '',
      observaciones: '', 
      fk_lote: ''
    });

    useEffect(() => {
      if(mode === 'update' && initialData) {
        
          setFecha(initialData.fecha),
          setCantidad(initialData.cantidad),
          setQuienRecibe(initialData.quien_recibe),
          setProceso(initialData.proceso_fermentacion),
          setHumedad(initialData.humedad_cafe),
          setAltura(initialData.altura_MSNM),
          setSecado(initialData.tipo_secado),
          setObservaciones(initialData.observaciones),
          setLoteFk(initialData.fk_lote)
        
      }
    }, [mode, initialData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        /* let hasErrors = false;
        const newErrors = { ...errors };

        // Validación de la "cantidad" como un número decimal positivo
        if (!datosForm.cantidad || isNaN(datosForm.cantidad) || datosForm.cantidad <= 0) {
          newErrors.cantidad = 'La cantidad debe ser un valor numérico positivo';
          hasErrors = true;
        }

        // Validación de "quien_recibe" para que solo contenga letras
        if (!datosForm.quien_recibe || !/^[a-zA-Z\s]+$/.test(datosForm.quien_recibe)) {
          newErrors.quien_recibe = 'El nombre del receptor debe contener solo letras';
          hasErrors = true;
        }
        if (!datosForm.proceso_fermentacion || !/^[a-zA-Z\s]+$/.test(datosForm.proceso_fermentacion)) {
          newErrors.proceso_fermentacion = 'El proceso de fermentación debe contener solo letras';
          hasErrors = true;
        }
        if (!datosForm.humedad_cafe || isNaN(datosForm.humedad_cafe) || datosForm.humedad_cafe <= 0) {
            newErrors.humedad_cafe = 'La humedad debe ser un valor numérico positivo';
            hasErrors = true;
          }
        if (!datosForm.altura_MSNM || isNaN(datosForm.altura_MSNM) || datosForm.altura_MSNM <= 0) {
            newErrors.altura_MSNM = 'La Altura debe ser un valor numérico positivo';
            hasErrors = true;
          }
          if (!datosForm.tipo_secado || !/^[a-zA-Z\s]+$/.test(datosForm.tipo_secado)) {
            newErrors.tipo_secado = 'El Tipo de secado debe contener solo letras';
            hasErrors = true;
          }
          if ( !datosForm.fk_lote || isNaN(datosForm.fk_lote) || datosForm.fk_lote<= 0) {
            newErrors.hasErrors = 'El valor de fk debe ser de numerico entero positivo';
            hasErrors = true
          }

        setErrors(newErrors);

        if (hasErrors) {
          return;
        } */

        try {
          const fechaValue = new Date(fecha).toISOString().slice(0, 10);

          const datosForm = {
            fecha: fechaValue,
            cantidad: cantidad,
            quien_recibe: quien_recibe,
            proceso_fermentacion: proceso,
            humedad_cafe: humedad,
            altura_MSNM: altura,
            tipo_secado: secado,
            observaciones: observaciones,
            fk_lote : parseInt(loteFk)
          }
          handleSubmit(datosForm, e);
        } catch (error) {
          alert('Error al conectar con el servidor' + error);
          console.log('Error al conectar con el servidor formulario ' + error);
        }
    };

    return (
        <>
        <form method='post' onSubmit={handleFormSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='fecha'
                    type="date"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required={true}
                    placeholder='Ingresa la fecha '
                />
                {errors.fecha && <span className='text-red-500'>{errors.fecha}</span>}

            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='cantidad'
                    name='cantidad'
                    type="decimal"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required={true}
                    placeholder='Ingrese la cantidad valor en N°'
                />
                {errors.cantidad && <span className='text-red-500'>{errors.cantidad}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='quien_recibe'
                    type="text"
                    name="quien_recibe"
                    value={quien_recibe}
                    onChange={(e) => setQuienRecibe(e.target.value)}
                    required={true}
                    placeholder='Ingrese el nombre de quien recibe'
                />
                {errors.quien_recibe && <span className='text-red-500'>{errors.quien_recibe}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='proceso_fermentacion'
                    type="text"
                    name="proceso_fermentacion"
                    required={true}
                    value={proceso}
                    onChange={(e) => setProceso(e.target.value)}
                    placeholder='Ingrese el proceso de fermentación.'
                />
                {errors.proceso_fermentacion && <span className='text-red-500'>{errors.proceso_fermentacion}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='humedad_cafe'
                    type="text"
                    name="humedad_cafe"
                    required={true}
                    value={humedad}
                    onChange={(e) => setHumedad(e.target.value) }
                    placeholder='Ingrese la humedad del café valor N°'
                />
                {errors.humedad_cafe && <span className='text-red-500'>{errors.humedad_cafe}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='altura_MSNM'
                    type="decimal"
                    name="altura_MSNM"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    required={true}
                    placeholder='Ingrese la altura en N°'
                />
                {errors.altura_MSNM && <span className='text-red-500'>{errors.altura_MSNM}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input
                    id='tipo_secado'
                    type="text"
                    name="tipo_secado"
                    value={secado}
                    onChange={(e) => setSecado(e.target.value)}
                    required={true}
                    placeholder='Ingrese el tipo de secado'
                />
                {errors.tipo_secado && <span className='text-red-500'>{errors.tipo_secado}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Textarea
                    id='observaciones'
                    name="observaciones"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    required={true}
                    placeholder='Ingresa las Observaciones'
                    rows="3"
                />
                {errors.observaciones && <span className='text-red-500'>{errors.observaciones}</span>}
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Select label='Selecciones el lote' value={loteFk} onChange={(e) => setLoteFk(e.target.value)} required={true}>
                  {lotes.map(lote => (
                    <SelectItem key={lote.codigo} value={lote.codigo} textValue={lote.codigo}>
                      {lote.codigo}
                    </SelectItem>
                  ))}
                </Select>
                {errors.fk_lote && <span className='text-red-500'>{errors.fk_lote}</span>}
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

export default FormMuestras;

