import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import axios from 'axios';
import AccionesModal from '../organisms/ModalAcciones.jsx'
import Ejemplo from '../organisms/TableLotes.jsx'
import LotesModal from '../templates/Lotes.jsx';
import axiosClient from '../axiosClient.js';

export function Lotes () {
    //TOKEN
    const token = localStorage.getItem('token');
 
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones,setModalAcciones]=useState(false);
    const [mode, setMode] = useState('create');
    const [initialData,setInitialData]=useState(null);
    const [mensaje, setMensaje] = useState('')
    const [lotes,setLotes]=useState([]);

    useEffect(()=>{

        peticionGet()

    },[token]);

    //PETICION GET PARA TRAER LOS DATOS DE LOS LOTES REGISTRADOS
    const peticionGet = async () => {
      try{
        await axiosClient.get('/lotes/listar').then((response)=>{
            console.log(response.data)
            setLotes(response.data)
        })
      }catch (error){
        console.log('Error en el servidor '+error)
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
      uid:'numero_arboles',
      name:'numero de arboles',
      sortable:true
    },
    {
      uid:'fk_finca',
      name:'finca',
      sortable:true
    },
    {   
        uid:'fk_variedad',
        name:'variedad',
        sortable:true
    },
    {
        uid:'estado',
        name:'estado',
        sortable:true
    },
    {
    uid:'actions',
    name:"Acciones",
    sortable:true
    }  
];


const id =localStorage.getItem('idUser')

//PETICION PARA DESACTIVAR LOTES

const peticionDesactivar = async (codigo) => {

    // console.log("ID del lotes a desactivar:", codigo);
   
    try {
        axiosClient.put(`/lotes/desactivar/${codigo}`,null).then((response)=>{
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






//PETICION PARA ACTIVAR LOTES

    const handleSubmit =async (datosForm,e)=>{
        console.log(datosForm);
        e.preventDefault()

        try{
        
        if(mode === 'create'){
            
            await axiosClient.post('/lotes/registrar', datosForm).then((response)=>{
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

            await axiosClient.put(`/lotes/actulizar/${id}`,datosForm).then((response)=>{
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
            console.log('Error en el servidor ',error)
            alert('Error en el servidor')
        }
    }




    
    const handleToggle = (mode,initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
    return (

        <div>
            <Header title="Lotes"/>
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
                <AccionesModal
                isOpen={modalAcciones}
                onClose={()=>setModalAcciones(false)}
                label={mensaje}
                />
                <LotesModal 
                open={modalOpen}
                onClose={()=> setModalOpen(false)}
                title={mode === 'create' ? 'Registrar lotes' : 'Actualizar lotes'}
                actionLabel={mode==='create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
                />
                <Ejemplo
                clickDesactivar={peticionDesactivar}
                clickEditar={() => handleToggle('update', id)}
                clickRegistrar={() => handleToggle('create')}
                data={data}
                lotes={lotes}
                />
            </div>
        </div>
    )
}