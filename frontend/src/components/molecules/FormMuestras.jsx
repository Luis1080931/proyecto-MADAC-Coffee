import React, { useContext, useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';
import MuestrasContext from './../../context/MuestrasContext.jsx'

const FormMuestras = ({ actionLabel, handleSubmit, mode, onClose}) => {

    const [fecha, setFecha] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [quien_recibe, setQuienRecibe] = useState('')
    const [proceso, setProceso] = useState('')
    const [humedad, setHumedad] = useState('')
    const [altura, setAltura] = useState('')
    const [secado, setSecado] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [loteFk, setLoteFk] = useState('') 
    const { idMuestras } = useContext(MuestrasContext)

    const [lotes, setLotes] = useState([])

    useEffect(() => {
      axiosClient.get('/lotes/activos').then((response) => {
        console.log(response.data)
        setLotes(response.data)
      })
    }, [])

    useEffect(() => {
      if(mode === 'update' && idMuestras) {
        
          setFecha(idMuestras.fecha),
          setCantidad(idMuestras.cantidad),
          setQuienRecibe(idMuestras.quien_recibe),
          setProceso(idMuestras.proceso_fermentacion),
          setHumedad(idMuestras.humedad_cafe),
          setAltura(idMuestras.altura_MSNM),
          setSecado(idMuestras.tipo_secado),
          setObservaciones(idMuestras.observaciones),
          setLoteFk(idMuestras.fk_lote)
        
      }
    }, [mode, idMuestras]);

    const handleFormSubmit = async (e) => {
        e.preventDefault()

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
            <div className='flex flex-row'>
                <div className='flex flex-col mr-2'>
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
                        
                    </div>
                </div>
                <div className='flex flex-col ml-4'>
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
                    
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Select label='Selecciones el lote' value={loteFk} onChange={(e) => setLoteFk(e.target.value)} required={true}>
                        {lotes.map(lote => (
                            <SelectItem key={lote.codigo} value={lote.codigo} textValue={lote.codigo}>
                            {lote.codigo}
                            </SelectItem>
                        ))}
                        </Select>
                        
                    </div>        
                </div>
            
            </div>
            <div>
                <div className="flex flex-wrap md:flex-nowrap mb-4 w-[400px]">
                    <Textarea
                        id='observaciones'
                        name="observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        required={true}
                        placeholder='Ingresa las Observaciones'
                        rows="3"
                    />
                
                </div>
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

