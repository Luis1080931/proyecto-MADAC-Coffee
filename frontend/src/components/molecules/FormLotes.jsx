import React, { useRef,useEffect,useState } from 'react';
import axios from 'axios';
import { ModalFooter,Button, Input, Select, SelectItem } from '@nextui-org/react';

export const FormLotes = ({ mode,initialData,handleSubmit,onClose,actionLabel }) => {

    //ESTADOS
    const [fincas, setFincas] = useState([])
    const [variedades, setVariedades] = useState([])

    const token = localStorage.getItem('token')
 
    const numero_arboles = useRef(null);
    const fk_finca = useRef(null);
    const fk_variedad = useRef(null);

    useEffect(() => {
                //Acceder en la url de la fincas y traer todas las filas

        axios.get('http://localhost:3000/fincas/listar', {headers: {token: token} }).then((response) => {
            console.log(response.data)

              //LA FINCA LA VA A FILTRAR SI ESTA EN ACTIVO
            const fincasFilter = response.data.filter(finca => finca.estado == 'activo')
            setFincas(fincasFilter)
        })
    }, [])

    useEffect(() => {
        //Acceder en la url de la variadades y traer todas las filas
        axios.get('http://localhost:3000/variedades/listar', {headers: {token: token}}).then((response) => {
            console.log(response.data)
        
        //LA FINCA LA VA A FILTRAR SI ESTA EN ACTIVO
            const variedadesFilter = response.data.filter(variedad => variedad.estado == 'activo')
            setVariedades(variedadesFilter)
        })
    }, [])


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
                        <Input className='p-2 rounded-lg w-80 h-12' id='numero_arboles' type="number" name='numero_arboles' label='Ingrese el número de árboles' ref={numero_arboles} required={true} />
                    </div>
                    <div className='flex flex-col m-5'  >
                        <label className='text-xl font-bold'> Finca: </label>
                        <Select className='p-2 rounded-lg w-80 h-12' label='Seleccione la finca' ref={fk_finca} required={true} >
                            {fincas.map(finca => (
                                //Con el selectItem para trer el nombre del caficultor como un selectItem
                                <SelectItem key={finca.codigo} value={finca.codigo} textValue={finca.codigo}>
                                    {/*el fk_caficultor hace referencia al alias que le colocamos el join */},
                                    {finca.codigo} - {finca.fk_caficultor}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Variedad: </label>
                        <Select className='p-2 rounded-lg w-80 h-12' label='Seleccione la variedad' ref={fk_variedad} required={true} >
                            {variedades.map(variedad => (
                                {/*el value significa que es el valor que corresponde al codigo y ese codigo es el que se envia a la base de datos*/},
                                <SelectItem key={variedad.codigo} value={variedad.codigo}>
                                    {/*se esta trayendo el nombre de variedas*/},
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