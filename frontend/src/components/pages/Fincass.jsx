import React, { useState, useEffect } from 'react';
import { Header } from '../molecules/Header.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import Ejemplo from '../organisms/TableFinca.jsx'
import FincasModal from '../templates/Fincas.jsx'; 
import axiosClient from '../axiosClient.js';

export function Fincas() {
    //TOKEN
    const token = localStorage.getItem('token');

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [fincas,setFincas] = useState([]);

    useEffect(()=>{
        
        peticionGet();

    },[token]);

    //PETICION GET PARA TRAER LOS DATOS DE LAS FINCAS REGISTRADAS

    const peticionGet = async () => {
        try {
            await axiosClient.get('/fincas/listar').then((response)=>{
                console.log(response.data)
                setFincas(response.data)
            })        

          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
      

//COLUMNAS DEL DATA_TABLE

const data = [
    {
        uid:'codigo',
        name:'codigo',
        sortable:true
    },
    {
        uid: 'dimension_mt2',
        name:'dimension en mt2',
        sortable:true
    },
    {
       uid:'fk_caficultor',
       name:'caficultor',
       sortable:true
    },
    {
        uid:'municipio',
        name:'municipio',
        sortable:true
    },
    {
        uid:'vereda',
        name:'vereda',
        sortable:true
    },
    {
        uid:'estado',
        name:'estado',
        sortable:true
    },
    {
        uid:'actions',
        name: "Acciones",
        sortable:true
    }
];

    //PETICION PARA DESACTIVAR FINCAS
    const id = localStorage.getItem('idUser')
    

    const peticionDesactivar = async (codigo) => {
        try {
            axiosClient.put(`/fincas/desactivar/${codigo}`,null).then((response)=>{
                console.log(response.data)
                if(response.status==200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    peticionGet()
                }else{
                    alert('Error')
                }
            });
        }catch(error){
            alert('Error del servidor '+error)
        }
    }




     //PETICION PARA ACTIVAR FINCAS
    const handleSubmit=async(datosForm,e)=>{
        console.log(datosForm);
        e.preventDefault()

        try{
        
        if(mode === 'create'){
            
            await axiosClient.post('/fincas/registrar', datosForm).then((response)=>{
                console.log(response)

                if(response.status == 200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalOpen(false)
                    peticionGet()
                }else{
                    alert('Error en el registro')
                }
            })
        }else if(mode==='update'){

            await axiosClient.put(`/fincas/actualizar/${id}`,datosForm).then((response)=>{
                console.log(response); 

                if(response.status==200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalOpen(false)
                    peticionGet()
                }else{
                    alert('Error al actualizar')
                }
            })
        }
        setModalOpen(false)

        }catch(error){
            console.log('Error en el servidor '+error)
            alert('Error en el servidor'+error)
        }
    }


    const handleToggle = (mode, initialData) => {
        setInitialData(initialData);
        setModalOpen(true);
        setMode(mode);
    };

    return (
        <div>
            <Header title="Fincas"/>
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>

                <AccionesModal
                isOpen={modalAcciones}
                onClose={()=>setModalAcciones(false)}
                label={mensaje}
                />
                 <FincasModal
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar resultados' : 'Actualizar fincas'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
            />

                <Ejemplo 
                clickDesactivar={peticionDesactivar}
                clickEditar={() => handleToggle('update', id)}
                clickRegistrar={() => handleToggle('create')}
                data={data}
                fincas={fincas}
           />
            </div>
        </div>
    );
}