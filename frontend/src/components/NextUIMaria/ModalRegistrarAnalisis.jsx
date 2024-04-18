import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import  axios from "axios";
import SweetAlertComponent from "./SweetAlertComponent";





export const ModalRegistrarAnalisis = ({fetchData}) => {

    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState(null);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const [formData, setFormData] = useState({
        analista: '',
        estado: '',
        fecha: '',
        fk_muestra: '',
        fk_tipo_analisis: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/analisis/listarUsuario');
                setData(response.data);
                console.log("admin", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get('http://localhost:3000/analisis/listarMuestras');
                setData2(response.data);
                console.log("muestras", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData2();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:3000/analisis/registrar', formData);

            fetchData();
            setFormData({
                analista: '',
                estado: '',
                fecha: '',
                fk_muestra: '',
                fk_tipo_analisis: ''
            });

            setIsSuccess(true);
            setMessage('Analisis registrado');
        } catch (error) {
            console.error('Error al enviar datos:', error);
            setIsSuccess(false);
            setMessage('Analisis NO registrado');
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
            <SweetAlertComponent type={isSuccess ? 'success' : 'error'} message={message} />
            <Button color="primary" className="my-3" onPress={onOpen}>Registrar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Registrar Análisis</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <Select
                                    label="Analista"
                                    placeholder="Nombre del analista"
                                    name="analista"
                                    value={formData.analista}
                                    onChange={handleChange}
                                >
                                    <SelectItem>
                                        Seleccionar un administrador
                                    </SelectItem>
                                    {data.map((item, index) => (
                                        <SelectItem key={item.identificacion } value={item.identificacion }>
                                            {item.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>
                                </div>

                           

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input type="date" name="fecha"
                                        value={formData.fecha}
                                        onChange={handleChange} label="Fecha" placeholder="Ingrese la fecha " />

                                </div>


                     


                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
    <Select
        name="fk_muestra"
        value={formData.fk_muestra}
        onChange={handleChange}
        label="Muestra"
        placeholder="Ingrese el código de la muestra"
    >
        <SelectItem textValue="Seleccionar un administrador">
            Seleccionar un administrador
        </SelectItem>
        {data2.map((item, index) => (
            <SelectItem key={item.fk_muestra} value={item.fk_muestra} textValue={item.fk_muestra}>
                {item.fk_muestra}
            </SelectItem>
        ))}
    </Select>
</div>


                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Tipo de análisis"
                                        placeholder="Seleccione el tipo de análisis"
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
                                    Cerrar
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
