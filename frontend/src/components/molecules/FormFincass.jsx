import React, { useRef, useEffect, useState } from 'react';
import { ModalFooter, Button, SelectItem, Select, Input } from "@nextui-org/react";
import axiosClient from '../axiosClient';

export const FormFincass = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

    const [caficultores, setCaficultores] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [formData, setFormData] = useState({
        dimension_mt2: '',
        fk_caficultor: '',
        municipio: '',
        vereda: ''
    });

    const { dimension_mt2, fk_caficultor, municipio, vereda } = formData;

    useEffect(() => {
        axiosClient.get('/usuarios/listar').then((response) => {
            const caficultoresFilter = response.data.usuarios.filter(caficultor => caficultor.tipo_usuario === 'caficultor');
            setCaficultores(caficultoresFilter);
        });
    }, []);

    useEffect(() => {
        axiosClient.get('/municipios/listar').then((response) => {
            setMunicipios(response.data);
        });
    }, []);

    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData({
                dimension_mt2: initialData.dimension_mt2,
                fk_caficultor: initialData.fk_caficultor,
                municipio: initialData.municipio,
                vereda: initialData.vereda
            });
        }
    }, [mode, initialData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(formData, e);
        } catch (error) {
            alert('Hay un error en el sistema ' + error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='dimension_mt2'
                            name='dimension_mt2'
                            type="number"
                            placeholder='Ingrese las dimensiones de la finca'
                            value={dimension_mt2}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Select
                            name='fk_caficultor'
                            required
                            label='Seleccione el caficultor'
                            value={fk_caficultor}
                            onChange={handleChange}
                        >
                            {caficultores.map(cafi => (
                                <SelectItem key={cafi.identificacion} value={cafi.identificacion}>
                                    {cafi.nombre}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Select
                            name='municipio'
                            required
                            label='Seleccione el municipio'
                            value={municipio}
                            onChange={handleChange}
                        >
                            {municipios.map(municipio => (
                                <SelectItem key={municipio.id_municipio} value={municipio.id_municipio}>
                                    {municipio.nombre}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input
                            id='vereda'
                            type="text"
                            name='vereda'
                            label='Ingrese la vereda'
                            value={vereda}
                            onChange={handleChange}
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
