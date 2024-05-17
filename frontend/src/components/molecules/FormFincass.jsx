import React, { useRef, useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, SelectItem, Select, Input } from "@nextui-org/react";
import axiosClient from '../axiosClient';
import FincasContext from './../../context/FincasContext.jsx'

export const FormFincass = ({ mode, handleSubmit, onClose, actionLabel }) => {

    const [caficultores, setCaficultores] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [formData, setFormData] = useState({
        dimension_mt2: '',
        fk_caficultor: '',
        municipios: '',
        vereda: ''
    });

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
            setFormData({
                dimension_mt2: idFinca.dimension_mt2,
                fk_caficultor: idFinca.fk_caficultor,
                municipio: idFinca.municipio,
                vereda: idFinca.vereda
            });
            console.log(idFinca.municipio);
        }
    }, [mode, idFinca]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { dimension_mt2, fk_caficultor, municipio, vereda } = formData;
            const data = {
                dimension_mt2,
                fk_caficultor,
                municipio,
                vereda
            }

            handleSubmit(data, e)
        } catch (error) {
            alert('Hay un error en el sistema ' + error);
        }
    };

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
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
                            value={formData.dimension_mt2}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <select
                            name='fk_caficultor'
                            id='fk_caficultor'
                            required
                            label='Seleccione el caficultor'
                            value={formData.fk_caficultor}
                            onChange={handleChange}
                        >
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
                            value={formData.municipio}
                            onChange={handleChange}
                        >
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
                            value={formData.vereda}
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
