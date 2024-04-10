import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import { FaSistrix } from 'react-icons/fa6';
import {ButtonActualizar} from '../atoms/ButtonActualizar.jsx'
import {ButtonDesactivar} from '../atoms/ButtonDesactivar.jsx'
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import LotesModal from '../templates/Lotes.jsx';
import DataTable from 'react-data-table-component'
import axios from 'axios';

export function Lotes () {
    const baseUrl='http://localhost:3000/lotes/listar';
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";
    const [originalData,setOriginalData] =useState([])
    const [filteredData,setFilteredData]=useState([]);
    const [data,setData]=useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [selectedLotes, setSelectedLotes] = useState(null)


    useEffect(()=>{
        peticionGet()
    },[]);


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
        name:'Acciones',
        cell:row=><> 
        <ButtonActualizar
        click={()=>handleToggle('update',row)}
        /> 
        <ButtonDesactivar
        click={()=>handleUpdate(row.codigo)}
        />
        </>
          
    }  
];
const peticionGet = async () => {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setData(response.data);
    } catch (error) {
        console.error('Error al intentar traer los datos', error);
    }
};
    function handleFilter(event) {
        const newData = originalData.filter(row => {
            return row.codigo.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setFilteredData(newData);
    }
    const actualizar =async (codigo,formData)=>{
        console.log(codigo)
        try{
            const baseURL=`http://localhost:3000/lotes/actualizar/${codigo}`
            await axios.put(baseURL, formData);
            alert('Lotes actualizado exitosamente');
            setModalOpen(false);
            peticionGet();
        }catch(error){
            console.error('Error al actualizar',error)
        }
    }
    const handleUpdate = async (codigo) => {
        console.log("ID del lotes a actualizar:", codigo);
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";
            const baseURL = `http://localhost:3000/lotes/desactivar/${codigo}`;
            await axios.put(baseURL, { headers: { token: token } });
            console.log("se desactivo correctamente el usuario");
            alert('Usuario desactivado con éxito');
            fetchData();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar usuario');
        }
    };
    const handleToggle = (mode, selectedLotes) => {
        setMode(mode);
        setSelectedLotes(selectedLotes);
        setModalOpen(true);
    };
    const handleSubmit=async(formData,e)=>{
        console.log(formData);
        try{
            if (mode === 'create') {
                const baseURL = 'http://localhost:3000/lotes/registrar';
                await axios.post(baseURL, formData, { headers: { token: token } });
                alert('Usuario registrado exitosamente');
                fetchData();
                setModalOpen(false);
            } else if (mode === 'update' && selectedLotes) {
                await actualizar(selectedLotes.identificacion, formData);
            }
        }catch(error){
            console.error('Error al procesa la solicitud',error)
        }
    }
    return (
        <>
            <div><Header title="Lotes"/></div>        
            <div>
                
                <div className='w-10/12 ml-28'>
                    <div className='flex justify-center items-center text-center'>
                        <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                            <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                            <FaSistrix size={25} style={{ marginRight: 10 }} />
                        </div>
                    </div>
                    <ButtonRegister   click={() => handleToggle('create')} />
                    <LotesModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        handleSubmit={handleSubmit}
                        selectedLotes={selectedLotes}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    />

                    <div style={{ height: '80vh', width: '100%' }}> 
                        <DataTable
                            columns={columns}
                            data={data}
                            title="Usuarios registrados"
                            fixedHeader
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}