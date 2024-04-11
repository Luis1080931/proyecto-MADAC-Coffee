import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import axios from "axios";




export const ModalRegistrarVariedades = ({ fetchData }) => {

    const [formData, setFormData] = useState({
        nombre: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:3000/variedades/registrar', formData);
            alert(response.data);
            fetchData();
            setFormData({
                nombre: ''
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
            <Button color="primary" className="my-3" onPress={onOpen}>Registrar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Modal Registrar Variedades</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange} label="nombre" placeholder="Enter your nombre" />

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>
                                    Registrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
