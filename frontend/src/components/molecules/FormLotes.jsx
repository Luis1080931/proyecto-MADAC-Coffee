import React, { useRef,useEffect,useState } from 'react';
import axios from 'axios';
import { ModalFooter,Button } from '@nextui-org/react';

export const FormLotes = ({ mode,initialData,handleSubmit,onClose,actionLabel }) => {
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";
 
    const numero_arboles = useRef(null);
    const fk_finca = useRef(null);
    const fk_variedad = useRef(null);


    useEffect(()=>{
        if(mode=='update' && initialData){
            console.log("ESTA MANDANDO ESTO",initialData);

            numero_arboles.current.value=initialData.numero_arboles
            fk_finca.current.value=initialData.fk_finca
            fk_variedad.current.value=initialData.fk_variedad
        }
    },[mode,initialData])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosForm = {
                numero_arboles:parseInt(numero_arboles.current.value),
                fk_finca: parseInt(fk_finca.current.value),
                fk_variedad: parseInt(fk_variedad.current.value)
            };
            handleSubmit(datosForm,e)
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    };


    return (
        <> 
                    <form method="post" onSubmit={handleFormSubmit}>
                    <div className='flex flex-col'>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Numero de arboles: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='numero_arboles' type="number" name='numero_arboles' placeholder='Ingrese el número de árboles' ref={numero_arboles} required={true} />
                        </div>
                        <div className='flex flex-col m-5'  >
                            <label className='text-xl font-bold'> Finca: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='fk_finca' type="number" name='fk_finca' placeholder='Ingrese el ID de la finca' ref={fk_finca} required={true} />
                        </div>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Variedad: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='fk_variedad' type="number" name='fk_variedad' placeholder='Ingrese la variedad' ref={fk_variedad} required={true}/>
                        </div>
                        <ModalFooter>
                            <Button
                            color='denger' variant='flat' onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button
                            type='submit' color='primary'
                            >
                            {actionLabel}
                            </Button>
                        </ModalFooter>
                    </div>
                </form>
        </>
    );
};    