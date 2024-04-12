import React, { useEffect, useRef } from 'react';
/* import { Button } from './../atoms/Button.jsx'; */

const FormMuestras = ({ actionLabel, handleSubmit, initialData, mode }) => {

    const fecha = useRef(null)
    const cantidad = useRef(null)
    const quien_recibe = useRef(null)
    const proceso_fermentacion = useRef(null)
    const humedad_cafe = useRef(null)
    const altura_MSNM = useRef(null)
    const tipo_secado = useRef(null)
    const observaciones = useRef(null)
    const fk_lote = useRef(null)

    useEffect(() => {
      if(mode == 'update' && initialData) {
        const formatDate = initialData.fecha.substring(0,10)
        fecha.current.value = formatDate
        cantidad.current.value = initialData.cantidad
        quien_recibe.current.value = initialData.quien_recibe
        proceso_fermentacion.current.value = initialData.proceso_fermentacion
        humedad_cafe.current.value = initialData.humedad_cafe
        altura_MSNM.current.value = initialData.altura_MSNM
        tipo_secado.current.value = initialData.tipo_secado
        observaciones.current.value = initialData.observaciones
        fk_lote.current.value = initialData.fk_lote
      }
    }, [mode, initialData])
  
    const handleFormSubmit = async (e) => {
        e.preventDefault()
      
        try {
          const data = {
            fecha: new Date(fecha.current.value),
            cantidad: cantidad.current.value,
            quien_recibe: quien_recibe.current.value,
            proceso_fermentacion: proceso_fermentacion.current.value,
            humedad_cafe: humedad_cafe.current.value,
            altura_MSNM: altura_MSNM.current.value,
            tipo_secado: tipo_secado.current.value,
            observaciones: observaciones.current.value,
            fk_lote: parseInt(fk_lote.current.value)
          }
          handleSubmit(data, e)

        } catch (error) {
          alert('Error al conectar con el servidor' + error);
          console.log('Error al conectar con el servidor formulario ' + error);
        }
      };
      
  
    return (
        <>
            <form  method='post' onSubmit={handleFormSubmit}>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <label className='text-xl font-bold'> Fecha: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="date"
                        name="fecha"
                        ref={fecha}
                        required= {true}
                        placeholder='Ingresa la fecha'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Cantidad: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        name='cantidad'
                        type="decimal"
                        ref={cantidad}
                        required={true}
                        placeholder='Ingrese la cantidad'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Quien recibe: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="text"
                        name="quien_recibe"
                        ref={quien_recibe}
                        required= {true}
                        placeholder='Ingrese Quien Recibe'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Proceso de fermentación: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="text"
                        name="proceso_fermentacion"
                        required= {true}
                        ref={proceso_fermentacion}
                        placeholder='Ingrese el proceso de fermentación'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Humedad café: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="text"
                        name="humedad_cafe"
                        required= {true}
                        ref={humedad_cafe}
                        placeholder='Ingrese la humedad del café'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Altura MSNM: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="decimal"
                        name="altura_MSNM"
                        ref={altura_MSNM}
                        required={true}
                        placeholder='Ingrese la altura'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Tipo de Secado: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="text"
                        name="tipo_secado"
                        ref={tipo_secado}
                        required= {true}
                        placeholder='Ingrese la Tipo de secado'
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Observaciones: </label>
                    <textarea
                        className='p-2 rounded-lg w-80'
                        name="observaciones"
                        ref={observaciones}
                        required={true}
                        placeholder='Observaciones'
                        rows="3"
                    />
                </div>
                <div className='flex-col md:flex'>
                    <label className='text-xl font-bold'> Lote: </label>
                    <input
                        className='p-2 rounded-lg w-80 h-12'
                        type="number"
                        placeholder='Ingrese la fk del lote'
                        name="fk_lote"
                        ref={fk_lote}
                        required= {true}
                    />
                </div>
                {/* <Button actionLabel={actionLabel} /> */}
            </div>
        </form>
        </>
        
    );
};

export default FormMuestras;
