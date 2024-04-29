import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios'

const FormMuestras = ({ actionLabel, handleSubmit, initialData, mode, onClose}) => {

    const fecha = useRef(null);
    const cantidad = useRef(null);
    const quien_recibe = useRef(null);
    const proceso_fermentacion = useRef(null);
    const humedad_cafe = useRef(null);
    const altura_MSNM = useRef(null);
    const tipo_secado = useRef(null);
    const observaciones = useRef(null);
    const fk_lote = useRef(null);

    const [lotes, setLotes] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
      axios.get('http://localhost:3000/lotes/listar', {headers: {token: token}}).then((response) => {
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
        fecha.current.value = initialData.fecha;
        cantidad.current.value = initialData.cantidad;
        quien_recibe.current.value = initialData.quien_recibe;
        proceso_fermentacion.current.value = initialData.proceso_fermentacion;
        humedad_cafe.current.value = initialData.humedad_cafe;
        altura_MSNM.current.value = initialData.altura_MSNM;
        tipo_secado.current.value = initialData.tipo_secado;
        observaciones.current.value = initialData.observaciones;
        fk_lote.current.value = initialData.fk_lote;
      }
    }, [mode, initialData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const fechaValue = new Date(fecha.current.value).toISOString().slice(0, 10);
      
        const datosForm = {
          fecha: fechaValue,
          cantidad: parseFloat(cantidad.current.value),
          quien_recibe: String(quien_recibe.current.value),
          proceso_fermentacion: proceso_fermentacion.current.value,
          humedad_cafe: parseFloat(humedad_cafe.current.value),
          altura_MSNM: parseFloat(altura_MSNM.current.value),
          tipo_secado: tipo_secado.current.value,
          observaciones: observaciones.current.value,
          fk_lote: parseInt(fk_lote.current.value)
        };

        let hasErrors = false;
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
        }

        try {
          handleSubmit(datosForm, e);
        } catch (error) {
          alert('Error al conectar con el servidor' + error);
          console.log('Error al conectar con el servidor formulario ' + error);
        }
    };



    return (
        <>
        <form method='post' onSubmit={handleFormSubmit}>
            <div className='flex flex-col'>

                <label className='text-xl font-bold'> Fecha: </label>
                <Input
                    id='fecha'
                    type="date"
                    name="fecha"
                    ref={fecha}
                    required={true}
                    placeholder='Ingresa la fecha '
                />
                {errors.fecha && <span className='text-red-500'>{errors.fecha}</span>}

            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Cantidad: </label>
                <Input
                    id='cantidad'
                    name='cantidad'
                    type="decimal"
                    ref={cantidad}
                    required={true}
                    placeholder='Ingrese la cantidad valor en N°'
                />
                {errors.cantidad && <span className='text-red-500'>{errors.cantidad}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Quien recibe: </label>
                <Input
                    id='quien_recibe'
                    type="text"
                    name="quien_recibe"
                    ref={quien_recibe}
                    required={true}
                    placeholder='Ingrese el nombre de quien recibe'
                />
                {errors.quien_recibe && <span className='text-red-500'>{errors.quien_recibe}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Proceso de fermentación: </label>
                <Input
                    id='proceso_fermentacion'
                    type="text"
                    name="proceso_fermentacion"
                    required={true}
                    ref={proceso_fermentacion}
                    placeholder='Ingrese el proceso de fermentación.'
                />
                {errors.proceso_fermentacion && <span className='text-red-500'>{errors.proceso_fermentacion}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Humedad del café: </label>
                <Input
                    id='humedad_cafe'
                    type="text"
                    name="humedad_cafe"
                    required={true}
                    ref={humedad_cafe}
                    placeholder='Ingrese la humedad del café valor N°'
                />
                {errors.humedad_cafe && <span className='text-red-500'>{errors.humedad_cafe}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Altura MSNM: </label>
                <Input
                    id='altura_MSNM'
                    type="decimal"
                    name="altura_MSNM"
                    ref={altura_MSNM}
                    required={true}
                    placeholder='Ingrese la altura en N°'
                />
                {errors.altura_MSNM && <span className='text-red-500'>{errors.altura_MSNM}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Tipo de Secado: </label>
                <Input
                    id='tipo_secado'
                    type="text"
                    name="tipo_secado"
                    ref={tipo_secado}
                    required={true}
                    placeholder='Ingrese el tipo de secado'
                />
                {errors.tipo_secado && <span className='text-red-500'>{errors.tipo_secado}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Observaciones: </label>
                <Textarea
                    id='observaciones'
                    name="observaciones"
                    ref={observaciones}
                    required={true}
                    placeholder='Ingresa las Observaciones'
                    rows="3"
                />
                {errors.observaciones && <span className='text-red-500'>{errors.observaciones}</span>}
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Lote: </label>
                <Select label='Selecciones el lote' ref={fk_lote} required={true}>
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

