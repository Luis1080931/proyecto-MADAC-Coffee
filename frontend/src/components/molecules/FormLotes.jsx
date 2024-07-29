import React, { useRef,useEffect,useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter,Button, Input, Select, SelectItem } from '@nextui-org/react';
import LotesContext from './../../context/LotesContext.jsx'

export const FormLotes = ({ mode,handleSubmit,onClose,actionLabel }) => {

    const [fincas, setFincas] = useState([])
    const [variedades, setVariedades] = useState([])

    const [numero, setNumero] = useState('')
    const [finca, setFinca] = useState('')
    const [variedadFk, setVariedadFk] = useState('')
    const { idLote } = useContext(LotesContext)

    useEffect(() => {
        axiosClient.get('/fincas/activas').then((response) => {
            setFincas(response.data)
        })
    }, [])

    useEffect(() => {
        axiosClient.get('/variedades/activas').then((response) => {
            setVariedades(response.data)
        })
    }, [])


    useEffect(()=>{
        if(mode=='update' && idLote){
            setNumero(idLote.numero_arboles)
            setFinca(idLote.fk_finca)
            setVariedadFk(idLote.codeVariedad)
        }
    },[mode,idLote])

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
                            id='numero'
                            type="number" 
                            name='numero'
                            label='Ingrese el número de árboles'
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4" >
                        <select className='w-[400px] rounded-xl bg-gray-100 h-[40px]' name='finca' label='Seleccione la finca' value={finca} onChange={(e) => setFinca(e.target.value)} required={true} >
                            <option value="" hidden> Seleccione finca ... </option>
                            {fincas.map(finca => (
                                <option key={finca.codigo} value={finca.codigo}>
                                    {finca.codigo} - {finca.fk_caficultor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                        <select className='w-[400px] rounded-xl bg-gray-100 h-[40px]' name='variedadFk' label='Seleccione la variedad' value={variedadFk} onChange={(e) => setVariedadFk(e.target.value)} required={true} >
                            <option value="" hidden> Seleccione variedad ... </option>
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
                            className='bg-[#273468] text-white'
                        >
                            {actionLabel}
                        </Button>
                    </ModalFooter>
                </div>
            </form>
        </>
    );
};    