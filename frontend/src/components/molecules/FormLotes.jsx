import React, { useRef,useEffect,useState } from 'react';
import axios from 'axios';
import { ModalFooter,Button } from '@nextui-org/react';

export const FormLotes = ({ mode,initialData,handleSubmit,onClose,actionLabel }) => {

    const [fincas, setFincas] = useState([])
    const [variedades, setVariedades] = useState([])

    const token = localStorage.getItem('token')
 
    const numero_arboles = useRef(null);
    const fk_finca = useRef(null);
    const fk_variedad = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3000/fincas/listar', {headers: {token: token} }).then((response) => {
            console.log(response.data)

            const fincasFilter = response.data.filter(finca => finca.estado == 'activo')
            setFincas(fincasFilter)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/variedades/listar', {headers: {token: token}}).then((response) => {
            console.log(response.data)

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
                        <input className='p-2 rounded-lg w-80 h-12' id='numero_arboles' type="number" name='numero_arboles' placeholder='Ingrese el número de árboles' ref={numero_arboles} required={true} />
                    </div>
                    <div className='flex flex-col m-5'  >
                        <label className='text-xl font-bold'> Finca: </label>
                        <select className='p-2 rounded-lg w-80 h-12' ref={fk_finca} required={true} >
                            {fincas.map(finca => (
                                <option key={finca.codigo} value={finca.codigo}>
                                    {finca.codigo} - {finca.fk_caficultor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col m-5'>
                        <label className='text-xl font-bold'> Variedad: </label>
                        <select className='p-2 rounded-lg w-80 h-12' ref={fk_variedad} required={true} >
                            {variedades.map(variedad => (
                                <option key={variedad.codigo} value={variedad.codigo}>
                                    {variedad.nombre}
                                </option>
                            ))}
                        </select>
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