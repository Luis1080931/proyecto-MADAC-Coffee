import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import {Buscador} from '../atoms/Buscador.jsx'
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import {ButtonActualizar} from '../atoms/ButtonActualizar.jsx'
import {ButtonDesactivar} from '../atoms/ButtonDesactivar.jsx'
import LotesModal from '../templates/Lotes.jsx';
import DataTable from 'react-data-table-component'
import AccionesModal from '../organisms/ModalAcciones.jsx'
import axios from 'axios';

export function Lotes () {
    //URL LISTAR FINCAS
    const baseUrl='http://localhost:3000/lotes/listar';
    //TOKEN
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";
 
    const [data,setData]=useState([]);   
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones,setModalAcciones]=useState(false);
    const [mode, setMode] = useState('create');
    const [initialData,setInitialData]=useState(null);
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{

        peticionGet()

    },[token]);

    //PETICION GET PARA TRAER LOS DATOS REGISTRADOS
    const peticionGet = async () => {
      try{
        axios.get(baseUrl,{headers: {token:token}}).then((response)=>{
            console.log(response.data)
            setData(response.data)
        })
      }catch (error){
        console.log('Error en el servidor '+error)
      }
    };

//COLUMNAS DEL DATATABLE
const columns = [
    {
        name:'codigo',
        selector:row=>row.codigo,
        sortable:true
    },
    {
      name:'numero de arboles',
      selector:row=>row.numero_arboles,
      sortable:true
    },
    {
      name:'finca',
      selector:row=>row.fk_finca,
      sortable:true
    },
    {
        name:'variedad',
        selector:row=>row.fk_variedad,
        sortable:true
    },
    {
        name:'estado',
        selector:row=>row.estado,
        sortable:true
    },
    {
        //Reutilizar los atomos de los buttons de Actualizar y Desactivar
        name:'Acciones',
        cell:row=><> 
        <ButtonActualizar
        click={()=>handleToggle('update',row)}
        /> 
        <ButtonDesactivar
        click={()=>peticionDesactivar(row.codigo)}
        />
        </>
          
    }  
];



function handleFilter(event) {
    const newData = data.filter(row => {
        return row.codigo.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setData(newData);
}

//PETICION PARA DESACTIVAR FINCAS

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

    const handleSubmit =async (data,e)=>{
        
        e.preventDefault()

        try{
        
        if(mode === 'create'){
            const baseURL = 'http://localhost:3000/lotes/registrar'
            
            await axios.post(baseURL, data).then((response)=>{
            
                console.log(response.data)

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
            const updateURL = `http://localhost:3000/lotes/actualizar/${initialData.codigo}`

            await axios.put(updateURL,data).then((response)=>{
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
                <Buscador handler={handleFilter} />
                <ButtonRegister click={() => handleToggle('create')} />
                <LotesModal 
                open={modalOpen}
                onClose={()=> setModalOpen(false)}
                title={mode === 'create' ? 'Registrar lotes' : 'Actualizar lotes'}
                actionLabel={mode==='create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
                setModalOpen={setModalOpen}
                />
                <DataTable
                columns={columns}
                data={data}
                title={'Lotes registrados'}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                />
            </div>
        </div>
    )
}