import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import axios from "axios";




export const ModalActualizarAnalisis = ({ item, fetchData }) => {

    const [formData, setFormData] = useState({
        analista: item.analista,
        estado: item.estado,
        fecha: item.fecha,
        fk_muestra: item.fk_muestra,
        fk_tipo_analisis: item.fk_tipo_analisis
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.put(`http://localhost:3000/analisis/actualizar/${item.codigo}`, formData);
            alert(response.data);
            fetchData();
            setFormData({
                analista: '',
                estado: '',
                fecha: '',
                fk_muestra: '',
                fk_tipo_analisis: ''
            });
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <>
            <Button color="success" className="my-3" onPress={onOpen}>Actualizar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Modal Actualizar Analisis</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input name="analista"
                                        value={formData.analista}
                                        onChange={handleChange} label="analista" placeholder="Enter your analista" />

                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input type="text" name="fecha"
                                        value={formData.fecha}
                                        onChange={handleChange} label="Email" placeholder="Enter your date" />

                                </div>


                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input type="text"
                                        name="fk_muestra"
                                        value={formData.fk_muestra}
                                        onChange={handleChange} label="muestra" placeholder="Enter your muestra" />

                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Favorite fk_tipo_analisis"
                                        placeholder="Select an fk_tipo_analisis"
                                        name="fk_tipo_analisis"
                                        value={formData.fk_tipo_analisis}
                                        onChange={handleChange}
                                    >
                                        <SelectItem onClick={() => setFormData({ ...formData, fk_tipo_analisis: "1" })}>
                                            Fisico
                                        </SelectItem>
                                        <SelectItem onClick={() => setFormData({ ...formData, fk_tipo_analisis: "2" })}>
                                            Sensorial
                                        </SelectItem>
                                    </Select>

                                </div>


                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>
                                    Actualizar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

