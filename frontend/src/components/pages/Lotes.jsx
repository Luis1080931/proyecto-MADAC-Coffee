import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import { FaSistrix } from 'react-icons/fa6';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import LotesModal from '../templates/Lotes.jsx';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'codigo',
        headerName: 'codigo',
        flex: 1,
        sortable: true
    },
    {
        field: 'numero_arboles',
        headerName: 'numero de arboles',
        flex: 1,
        sortable: true
    },
    {
        field: 'fk_finca',
        headerName: 'Finca',
        flex: 1,
        sortable: true
    },
    {
        field: 'fk_variedad',
        headerName: 'Variedad',
        flex: 1,
        sortable: true
    },
];
const baseUrl='http://localhost:3000/lotes/listar';
export function Lotes () {
    const [originalData,setOriginalData] =useState([])
    const [data,setData]=useState([]);
    const [filteredData,setFilteredData]=useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');

    const handleToggle = (mode) => {
        setMode(mode)
        setModalOpen(true);
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";

    
    const peticionGet = async () => {
        try {
            const response = await axios.get(baseUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error al intentar traer los datos', error);
        }
    };

    useEffect(()=>{
        peticionGet();
    },[]);

    function handleFilter(event) {
        const newData = originalData.filter(row => {
            return row.codigo.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setFilteredData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'create') {
            const baseURL = 'http://localhost:3000/lotes/registrar';
            axios.post(baseURL).then((response) => {
                console.log("Registrado con éxito");
                setModalOpen(false);
            }).catch(error => console.error('Error al registrar: ', error));
        } else if (mode === 'update') {
        }
        setModalOpen(false);
    };
    return (
        <>
            <div>
                <Header title="Lotes" />
                <div className='w-10/12 ml-28'></div>
                <div className='flex justify-center items-center text-center' >
                    <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black' >
                        <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                        <FaSistrix size={25} style={{ marginRight: 10 }} />
                    </div>
                </div>
                <ButtonRegister click={() => handleToggle('create')} />
                <LotesModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleSubmit={handleSubmit}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />
                <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                 style={{ height: '100%', width: '100%' }}
                 columns={columns}
                 rows={data.map((row, index) => ({
                  ...row,
                 id: index + 1, // Añade un ID único para cada fila, podrías usar otra propiedad si la tienes
                }))}
                pageSize={5}
                 checkboxSelection
                disableSelectionOnClick
                />
                </div>
            </div>
        </>
    );
}