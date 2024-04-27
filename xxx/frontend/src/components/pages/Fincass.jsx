import React, { useState, useEffect } from 'react';
import { Header } from '../molecules/Header.jsx';
import axios from 'axios';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import Ejemplo from '../organisms/TableFinca.jsx'
import FincasModal from '../templates/Fincas.jsx'; 

export function Fincas() {
    //URL LISTAR LOTES
    const baseURL='http://localhost:3000/fincas/listar';
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
            await axios.get(baseURL,{headers:{token: token}}).then((response)=>{
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
            axios.put(`http://localhost:3000/fincas/desactivar/${codigo}`,null,{headers:{token:token}}).then((response)=>{
                console.log(response.data)
                if(response.status==200){
                    setMensaje('Se desactivo con exito la finca')
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
            const baseURL = 'http://localhost:3000/fincas/registrar'
            
            await axios.post(baseURL, datosForm).then((response)=>{
                console.log(response)

                if(response.status == 200){
                    setMensaje('Finca registrada con exito')
                    setModalAcciones(true)
                    setModalOpen(false)
                    peticionGet()
                }else{
                    alert('Error en el registro')
                }
            })
        }else if(mode==='update'){
            const updateURL = `http://localhost:3000/fincas/actualizar/${id}`

            await axios.put(updateURL,datosForm).then((response)=>{
                console.log(response); 

                if(response.status==200){
                    setMensaje('Se actualizo la finca con exito')
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