import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import axios from 'axios';
import AccionesModal from '../organisms/ModalAcciones.jsx'
import Ejemplo from '../organisms/TableLotes.jsx'
import LotesModal from '../templates/Lotes.jsx';

export function Lotes () {
    //URL LISTAR FINCAS
    const baseURL='http://localhost:3000/lotes/listar';
    //TOKEN
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";
 
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
        await axios.get(baseURL,{headers:{token: token}}).then((response)=>{
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
        axios.put(`http://localhost:3000/lotes/desactivar/${codigo}`,null,{headers:{token:token}}).then((response)=>{
            console.log(response.data)
            if(response.status==200){
                setMensaje('Se desactivo con exito el lote')
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
            const baseURL = 'http://localhost:3000/lotes/registrar'
            
            await axios.post(baseURL, datosForm).then((response)=>{
                console.log(response)

                if(response.status == 200){
                    setMensaje('Lote registrado con exito')
                    setModalAcciones(true)
                    setModalOpen(false)
                    peticionGet()
                }else{
                    alert('Error en el registro')
                }
            })
        }else if(mode==='update'){
            const updateURL = `http://localhost:3000/lotes/actualizar/${id}`

            await axios.put(updateURL,data).then((response)=>{
                console.log(response); 

                if(response.status==200){
                    setMensaje('Se actualizo el lote con exito')
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
            <div className='w-full flex flex-col justify-center items-center p-10'>
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