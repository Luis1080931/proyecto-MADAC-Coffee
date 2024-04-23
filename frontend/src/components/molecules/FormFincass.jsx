
import React, { useRef,useEffect,useState } from 'react';
import axios from 'axios';
import {ModalFooter, Button, SelectItem, Select, Input } from "@nextui-org/react";

export const FormFincass = ({mode,initialData,handleSubmit,onClose,actionLabel}) => {

    const [caficultor, setCaficultor] = useState([])
    const [municipios, setMunicipios] = useState([]);

    const dimension_mt2 = useRef(null);
    const fk_caficultor = useRef(null);
    const municipio = useRef(null);
    const vereda = useRef(null);

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('http://localhost:3000/usuarios/listar', {headers: {token: token}}).then((response) => {
            console.log(response.data)

            const caficultorFilter = response.data.usuarios.filter(caficultor => caficultor.tipo_usuario == 'caficultor')
            setCaficultor(caficultorFilter)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/municipios/listar').then((response) => {
            console.log(response.data)
            setMunicipios(response.data)
        })
    }, [])

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
            const datosForm = {
                dimension_mt2: parseInt(dimension_mt2.current.value),
                fk_caficultor: parseInt(fk_caficultor.current.value),
                municipio: parseInt(municipio.current.value),
                vereda: vereda.current.value
            };
            handleSubmit(datosForm,e)
        } catch (error) {
            alert('Hay un error en el sistema ' + error);
        }
    };

    
    return (
        <>
        <form method='post' onSubmit={handleFormSubmit}>
            <div className='flex flex-col'>
                <div className='flex flex-col m-5'>
                    <label className='text-xl font-bold'> Dimensiones de la finca: </label>
                    <Input className='p-2 rounded-lg w-80 h-12' id='dimension_mt2' name='dimension_mt2' type="number" placeholder='Ingrese las dimensiones de la finca' ref={dimension_mt2} required={true}/>
                </div>
                <div className='flex flex-col m-5'  >
                    <label className='text-xl font-bold'> Caficultor: </label>
                    <Select ref={fk_caficultor} required= {true} label='Seleccione el caficultor'>
                        {caficultor.map(cafi => (
                            <SelectItem key={cafi.identificacion} value={cafi.identificacion}>
                                {cafi.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='flex flex-col m-5'>
                    <label className='text-xl font-bold'> Municipio: </label>
                    <Select ref={municipio} required={true} label='Seleccione el municipio'>
                        {municipios.map(municipio => (
                            <SelectItem key={municipio.id_municipio} value={municipio.id_municipio}>
                                {municipio.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='flex flex-col m-5'>
                    <label className='text-xl font-bold'> Vereda: </label>
                    <Input className='p-2 rounded-lg w-80 h-12' id='vereda' type="text" name='vereda' label='Ingrese la vereda' ref={vereda} required={true}/>
                </div>
                <ModalFooter>
                    <Button 
                    color='danger' variant='flat' onPress={onClose}
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
    )
};

