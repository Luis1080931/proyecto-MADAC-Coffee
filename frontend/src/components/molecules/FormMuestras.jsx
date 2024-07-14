import React, { useContext, useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient';
import MuestrasContext from './../../context/MuestrasContext.jsx'

const FormMuestras = ({ actionLabel, handleSubmit, mode, onClose}) => {

    const [fecha, setFecha] = useState('')
    const [tipoMolienda, setTipoMolienda] = useState('')
    const [densidadCafe, setDensidadCafe] = useState('')
    const [proceso, setProceso] = useState('')
    const [tipoTostion, setipoTostion] = useState('')
    const [altura, setAltura] = useState('')
    const [tiempoFermento, setTiempoFermento] = useState('')
    const [actividadAgua, setActividadAgua] = useState('')
    const [tiempoSecado, setTiempoSecado] = useState('')
    const [presentacion, setPresentacion] = useState('')
    const [loteFk, setLoteFk] = useState('') 
    const { idMuestras } = useContext(MuestrasContext)

    const [lotes, setLotes] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
      axiosClient.get('/lotes/activos').then((response) => {
        console.log(response.data)
        setLotes(response.data)
      })
    }, [])

    useEffect(() => {
        if (mode === 'update' && idMuestras) {
          const formatFecha = (fecha) => {
            return new Date(fecha).toISOString().split('T')[0];
          };
      
          setFecha(formatFecha(idMuestras.fecha));
          setTipoMolienda(idMuestras.nombre);
          setDensidadCafe(idMuestras.densidad_cafe);
          setProceso(idMuestras.proceso_fermentacion);
          setipoTostion(idMuestras.tipo_tostion);
          setAltura(idMuestras.altura_MSNM);
          setTiempoFermento(idMuestras.tiempo_fermentacion);
          setActividadAgua(idMuestras.actividad_agua);
          setTiempoSecado(idMuestras.tiempo_secado);
          setPresentacion(idMuestras.presentacion);
          setLoteFk(idMuestras.fk_lote);
      
          console.log(idMuestras.nombre);
        }
      }, [mode, idMuestras]);
      

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
          const fechaValue = new Date(fecha).toISOString().slice(0, 10);

          const datosForm = {
            fecha: fechaValue,
            tipo_molienda: tipoMolienda,
            densidad_cafe: densidadCafe,
            proceso_fermentacion: proceso,
            tipo_tostion: tipoTostion,
            altura_MSNM: altura,
            tiempo_fermentacion: tiempoFermento,
            actividad_agua: actividadAgua,
            tiempo_secado: tiempoSecado,
            presentacion: presentacion,
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
                <div className='flex flex-col mr-2 w-[190px]'>
                    <div className="flex w-[190px] flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='fecha'
                            type="date"
                            name="fecha"
                            label='Fecha de recepción'
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required={true}
                            placeholder='Ingresa la fecha '
                        />

                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='tipoMolienda'
                            name='tipoMolienda'
                            type="decimal"
                            label='Tipo de molienda'
                            value={tipoMolienda}
                            onChange={(e) => setTipoMolienda(e.target.value)}
                            required={true}
                            placeholder='Tipo molienda'
                        />
                    
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='densidadCafe'
                            type="text"
                            label='Densidad del café'
                            name="densidadCafe"
                            value={densidadCafe}
                            onChange={(e) => setDensidadCafe(e.target.value)}
                            required={true}
                            placeholder='Densidad café'
                        />
                    
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='proceso_fermentacion'
                            type="text"
                            name="proceso_fermentacion"
                            label='Proceso de fementación'
                            required={true}
                            value={proceso}
                            onChange={(e) => setProceso(e.target.value)}
                            placeholder='Proceso fermetación'
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='tipoTostion_cafe'
                            type="text"
                            name="tipoTostion_cafe"
                            label='Tipo de tostión del café'
                            required={true}
                            value={tipoTostion}
                            onChange={(e) => setipoTostion(e.target.value) }
                            placeholder='Tostion del café'
                        />
                    
                    </div>
                </div>
                <div className='flex flex-col ml-2 w-[190px]'>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='altura_MSNM'
                            type="text"
                            name="altura_MSNM"
                            label='Altura MSNM'
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            required={true}
                            placeholder='Altura MSNM'
                        />
                    
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='tipo_tiempoFermento'
                            type="text"
                            name="tipo_tiempoFermento"
                            label='Tiempo de fermentación'
                            value={tiempoFermento}
                            onChange={(e) => setTiempoFermento(e.target.value)}
                            required={true}
                            placeholder='Tiempo de Fermento'
                        />
                    
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-4 w-full">
                        <Input
                            id='actividadAgua'
                            name="actividadAgua"
                            label='Actividad del agua'
                            value={actividadAgua}
                            onChange={(e) => setActividadAgua(e.target.value)}
                            required={true}
                            placeholder='Actividad del agua'
                            rows="3"
                        />
                        
                        </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='tiempo_secado'
                            type="text"
                            name="tipempo_secado"
                            label='Tiempo de secado'
                            value={tiempoSecado}
                            onChange={(e) => setTiempoSecado(e.target.value)}
                            required={true}
                            placeholder='Tiempo de secado'
                        />
                    
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='presentacion'
                            type="text"
                            name="presentacion"
                            label='Presentación'
                            value={presentacion}
                            onChange={(e) => setPresentacion(e.target.value)}
                            required={true}
                            placeholder='Presentacion'
                        />
                    
                    </div>
                </div>
                            
            </div>
            <div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                    <select className='w-[400px] rounded-xl bg-gray-100 h-[40px]' label='Selecciones el lote' value={loteFk} onChange={(e) => setLoteFk(e.target.value)} required={true}>
                        <option value='' hidden> Seleccione el lote... </option>
                    {lotes.map(lote => (
                        <option key={lote.codigo} value={lote.codigo} textValue={lote.codigo}>
                        {lote.codigo}
                        </option>
                    ))}
                    </select>
                            
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