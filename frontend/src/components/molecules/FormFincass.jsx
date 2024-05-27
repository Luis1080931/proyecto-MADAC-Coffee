import React, { useRef, useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, SelectItem, Select, Input } from "@nextui-org/react";
import axiosClient from '../axiosClient';
import FincasContext from './../../context/FincasContext.jsx'

export const FormFincass = ({ mode, handleSubmit, onClose, actionLabel }) => {

    const [caficultores, setCaficultores] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [nombre, setNombre ] = useState('')
    const [dimension, setDimension ] = useState('')
    const [caficultor, setCaficultor ] = useState('')
    const [municipio, setMunicipio ] = useState('')
    const [vereda, setVereda ] = useState('')

    const { idFinca } = useContext(FincasContext)

    useEffect(() => {
        axiosClient.get('/usuarios/caficultores').then((response) => {
            // console.log(response.data);
            setCaficultores(response.data);
        });
    }, []);

    useEffect(() => {
        axiosClient.get('/municipios/listar').then((response) => {
            setMunicipios(response.data);
        });
    }, []);

    useEffect(() => {
        if (mode === 'update' && idFinca) {
            
            setNombre(idFinca.nombre_finca)
            setCaficultor(idFinca.fk_caficultor)
            setDimension(idFinca.dimension_mt2)
            setMunicipio(idFinca.municipio)
            setVereda(idFinca.vereda)
        }
    }, [mode, idFinca]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const data = {
                nombre,
                dimension_mt2: dimension,
                fk_caficultor: parseInt(caficultor),
                municipio,
                vereda
            }

            handleSubmit(data, e)
        } catch (error) {
            alert('Hay un error en el sistema ' + error);
        }
    }

    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='nombre'
                            name='nombre'
                            type="text"
                            placeholder='Nombre de la finca'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='dimension_mt2'
                            name='dimension_mt2'
                            type="number"
                            placeholder='Ingrese las dimensiones de la finca'
                            value={dimension}
                            onChange={(e) => setDimension(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <select
                            name='fk_caficultor'
                            className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
                            id='fk_caficultor'
                            required
                            label='Seleccione el caficultor'
                            value={caficultor}
                            onChange={(e) => setCaficultor(e.target.value)}
                        >
                            <option value="" hidden> Seleccione catador ... </option>
                            {caficultores.map((cafi) => (
                                <option key={cafi.identificacion} value={cafi.identificacion}>
                                    {cafi.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <select
                            name='municipio'
                            required
                            label='Seleccione el municipio'
                            className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
                            value={municipio}
                            onChange={(e) => setMunicipio(e.target.value)}
                        >
                            <option value="" hidden> Seleccione municipio ... </option>
                            {municipios.map(municipio => (
                                <option key={municipio.id_municipio} value={municipio.id_municipio}>
                                    {municipio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='vereda'
                            type="text"
                            name='vereda'
                            label='Ingrese la vereda'
                            value={vereda}
                            onChange={(e) => setVereda(e.target.value)}
                            required
                        />
                    </div>
                    <ModalFooter>
                        <Button
                            color='danger' variant='flat' onPress={onClose}
                        >
                            Cerrar
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
