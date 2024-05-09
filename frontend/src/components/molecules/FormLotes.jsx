import React, { useRef,useEffect,useState } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter,Button, Input, Select, SelectItem } from '@nextui-org/react';

export const FormLotes = ({ mode,initialData,handleSubmit,onClose,actionLabel }) => {

    const [fincas, setFincas] = useState([])
    const [variedades, setVariedades] = useState([])

    const [numero, setNumero] = useState('')
    const [finca, setFinca] = useState('')
    const [variedadFk, setVariedadFk] = useState('')

    useEffect(() => {
        axiosClient.get('/fincas/listar').then((response) => {
            console.log(response.data)

            const fincasFilter = response.data.filter(finca => finca.estado == 'activo')
            setFincas(fincasFilter)
        })
    }, [])

    useEffect(() => {
        axiosClient.get('/variedades/listar').then((response) => {
            console.log(response.data)

            const variedadesFilter = response.data.filter(variedad => variedad.estado == 'activo')
            setVariedades(variedadesFilter)
        })
    }, [])


    useEffect(()=>{
        if(mode=='update' && initialData){
            setNumero(initialData.numero_arboles)
            setFinca(initialData.fk_finca)
            setVariedadFk(initialData.fk_variedad)
        }
    },[mode,initialData])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                numero_arboles: parseInt(numero),
                fk_finca: parseInt(finca),
                fk_variedad: parseInt(variedadFk)
            }
            handleSubmit(formData,e)
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    }

    return (
        <> 
            <form method="post" onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Input 
                            id='numero_arboles'
                            type="number" 
                            name='numero_arboles'
                            label='Ingrese el número de árboles'
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4" >
                        <Select label='Seleccione la finca' value={finca} onChange={(e) => setFinca(e.target.value)} required={true} >
                            {fincas.map(finca => (
                                <SelectItem key={finca.codigo} value={finca.codigo} textValue={finca.codigo}>
                                    {finca.codigo} - {finca.fk_caficultor}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <Select label='Seleccione la variedad' value={variedadFk} onChange={(e) => setVariedadFk(e.target.value)} required={true} >
                            {variedades.map(variedad => (
                                <SelectItem key={variedad.codigo} value={variedad.codigo}>
                                    {variedad.nombre}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <ModalFooter>
                        <Button
                            color='danger'
                            variant='flat'
                            onPress={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            type='submit'
                            color='primary'
                        >
                            {actionLabel}
                        </Button>
                    </ModalFooter>
                </div>
            </form>
        </>
    );
};    