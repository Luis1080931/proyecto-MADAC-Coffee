import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import axios from "axios";




export const ModalActualizarVariedades = ({ item, fetchData }) => {

    const [formData, setFormData] = useState({
        nombre: item.nombre,
        estado: item.estado
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.put(`http://localhost:3000/variedades/actualizar/${item.codigo}`, formData);
            alert(response.data);
            fetchData();
            setFormData({
                nombre: '',
                estado: ''
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
                            <ModalHeader className="flex flex-col gap-1 text-center">Modal Actualizar Variedades</ModalHeader>
                            <ModalBody>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange} label="nombre" placeholder="Enter your nombre" />

                                </div>



                               <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input name="estado"
                                        value={formData.estado}
                                        onChange={handleChange} label="estado" placeholder="Enter your estado" />

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

