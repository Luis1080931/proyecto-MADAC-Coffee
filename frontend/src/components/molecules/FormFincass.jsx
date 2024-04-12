
import React, { useRef,useEffect,useState } from 'react';
import axios from 'axios';
/* import { Button } from '../atoms/Button.jsx'; */
import AccionesModal from  '../organisms/ModalAcciones.jsx'

export const FormFincass = ({actionLabel,mode,initialData,handleSubmit}) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw"
    const [modalAccionesOpen,setModalAccionesOpen]=useState(false);

    const dimension_mt2 = useRef(null);
    const fk_caficultor = useRef(null);
    const municipio = useRef(null);
    const vereda = useRef(null);

    useEffect(()=>{
        if(mode == 'update' && initialData){
            console.log("ESTA MANDANDO ESTO ",initialData);

            dimension_mt2.current.value=initialData.dimension_mt2
            fk_caficultor.current.value=initialData.fk_caficultor
            municipio.current.value=initialData.municipio
            vereda.current.value=initialData.vereda
        }
    },[mode,initialData])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                dimension_mt2: parseInt(dimension_mt2.current.value),
                fk_caficultor: parseInt(fk_caficultor.current.value),
                municipio: parseInt(municipio.current.value),
                vereda: vereda.current.value
            };
            handleSubmit(data,e)
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    };


    return (
        <>

        <AccionesModal 
            isOpen={modalAccionesOpen}
            onClose={() => setModalAccionesOpen(false)}
            label={mode === 'update' ? 'Fincas actualizada con éxito' : 'Fincas registrado con éxito'}
        />
    <div>
        <form method='post' onSubmit={handleFormSubmit}>
        <div className='flex flex-col m-5'>
        <label className='text-xl font-bold'> Dimensiones de la finca: </label>
        <input className='p-2 rounded-lg w-80 h-12' id='dimension_mt2' name='dimension_mt2' type="number" placeholder='Ingrese las dimensiones de la finca' ref={dimension_mt2} required={true}/>
        </div>
        <div className='flex flex-col m-5'  >
        <label className='text-xl font-bold'> Caficultor: </label>
        <input className='p-2 rounded-lg w-80 h-12' id='fk_caficultor' type="number" name='fk_caficultor'  placeholder='Ingrese la identificacion del caficultor' ref={fk_caficultor} required={true}/>
        </div>
         <div className='flex flex-col m-5'>
        <label className='text-xl font-bold'> Municipio: </label>
        <input className='p-2 rounded-lg w-80 h-12' id='municipio' type="number" name='municipio'placeholder='Ingrese el municipio' ref={municipio} required={true}/>
        </div>
         <div className='flex flex-col m-5'>
        <label className='text-xl font-bold'> Vereda: </label>
        <input className='p-2 rounded-lg w-80 h-12' id='vereda' type="text" name='vereda' placeholder='Ingrese la vereda' ref={vereda} required={true}/>
         </div>
    {/* <Button actionLabel={actionLabel} /> */}
        </form>
    </div>
        </>
        )
};

