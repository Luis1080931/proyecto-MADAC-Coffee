import React, { useState, useEffect } from 'react';
import { Header } from '../molecules/Header.jsx';
import {Buscador} from '../atoms/Buscador.jsx'
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';
import { ButtonDesactivar } from '../atoms/ButtonDesactivar.jsx';
import FincasModal from '../templates/Fincas.jsx'; 
import DataTable from 'react-data-table-component'
import AccionesModal from '../organisms/ModalAcciones.jsx';
import axios from 'axios';


export function Fincas() {
    //URL LISTAR LOTES
    const baseUrl='http://localhost:3000/fincas/listar';
    //TOKEN
    const token = localStorage.getItem('token');

    const [data,setData]=useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        
        peticionGet();

    },[token]);

    //PETICION GET PARA TRAER LOS DATOS DE LAS FINCAS REGISTRADAS

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

//COLUMNAS DEL DATA_TABLE

const columns = [
    {
        name:'codigo',
        selector:row=>row.codigo,
        sortable:true
    },
    {
        name:'dimension en mt2',
        selector:row=>row.dimension_mt2,
        sortable:true
    },
    {
       name:'caficultor',
       selector:row=>row.fk_caficultor,
       sortable:true
    },
    {
        name:'municipio',
        selector:row=>row.municipio,
        sortable:true
    },
    {
        name:'vereda',
        selector:row=>row.vereda,
        sortable:true
    },
    {
        name:'estado',
        selector:row=>row.estado,
        sortable:true
    },
    {
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
        const newData = originalData.filter(row => {
            return row.codigo.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setFilteredData(newData);
    }


    //PETICION PARA DESACTIVAR FINCAS

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

    const handleSubmit=async(data,e)=>{

        e.preventDefault()

        try{
        
        if(mode === 'create'){
            const baseURL = 'http://localhost:3000/fincas/registrar'
            
            await axios.post(baseURL, data).then((response)=>{
            
                console.log(response.data)

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
            const updateURL = `http://localhost:3000/fincas/actualizar/${initialData.codigo}`

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



    const handleToggle = (mode, initialData) => {
        setInitialData(initialData);
        setModalOpen(true);
        setMode(mode);
    };

    return (
        <div>
            <Header title="Fincas"/>
            <div className='w-full flex flex-col justify-center items-center p-10'>
                <AccionesModal
                isOpen={modalAcciones}
                onClose={()=>setModalAcciones(false)}
                label={mensaje}
                />
                <Buscador handler={handleFilter} />
                <ButtonRegister click={() => handleToggle('create')} />
                <FincasModal 
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
                title={'Fincas registrados'}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                />
            </div>
        </div>
    );
}