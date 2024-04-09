import React, { useState, useEffect } from 'react';
import { Header } from '../molecules/Header.jsx';
import { FaSistrix } from 'react-icons/fa6';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import FincasModal from '../templates/Fincas.jsx'; 
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
        field: 'dimension_mt2',
        headerName: 'Dimensiones en mt2',
        flex: 1,
        sortable: true
    },
    {
        field: 'fk_caficultor',
        headerName: 'Caficultor',
        flex: 1,
        sortable: true
    },
    {
        field: 'municipio',
        headerName: 'Municipio',
        flex: 1,
        sortable: true
    },
    {
        field: 'vereda',
        headerName: 'Vereda',
        flex: 1,
        sortable: true
    },
];
const baseUrl = 'http://localhost:3000/fincas/listar';
export function Fincas() {

    const [originalData, setOriginalData] = useState([]);
    const [data,setData]=useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');

    const handleToggle = (mode) => {
        setMode(mode);
        setModalOpen(true);
    };

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
        } catch (error) {
            console.error('Error al intentar traer los datos', error);
        }
    };
    

    useEffect(() => {
        peticionGet();
    }, []);

    function handleFilter(event) {
        const newData = originalData.filter(row => {
            return row.codigo.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setFilteredData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'create') {
            const baseURL = 'http://localhost:3000/fincas/registrar';
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
                <Header title="Fincas" />
                <div className='w-10/12 ml-28'></div>
                <div className='flex justify-center items-center text-center' >
                    <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black' >
                        <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                        <FaSistrix size={25} style={{ marginRight: 10 }} />
                    </div>
                </div>
                <ButtonRegister click={() => handleToggle('create')} />
                <FincasModal
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
/**
 import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../molecules/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import FincasModal from '../templates/Fincas.jsx';
import Buscador from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';

export function Fincas() {

    const columns = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Dimensiones mt2',
            selector: row => row.dimension,
            sortable: true
        },
        {
            name: 'Caficultor',
            selector: row => row.caficultor,
            sortable: true
        },
        {
            name: 'Municipio',
            selector: row => row.municipio,
            sortable: true
        },
        {
            name: 'Vereda',
            selector: row => row.vereda,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            selector: row => row.acciones,
            wrap: true 
        }
    ]

    const data = [
        {
            codigo: 1,
            dimension: "3000",
            caficultor: 1,
            municipio: "Huila",
            vereda: "Versalles",
            valor: "30 g",
            estado: "activo",
            acciones: <div className="flex flex-col"> <ButtonActualizar click={() => handleToggle('update')} /> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
        }
    ]

    const paginaOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    }

    const [records, setRecords] = useState(data)

    function handleFilter(event) {
        const newData = data.filter(row => {
            return row.variable.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [mode, setMode] = useState('create')

    const handleToggle = (mode) => {
        setMode(mode)
        setModalOpen(true)
        if(mode === 'update'){
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mode === 'create'){
            const baseURL = 'http://localhost:3000/resultados/registrar'

            axios.post(baseURL).then((response) => {
                console.log("Registrado con exito")
                setModalOpen(false)
            })
        }else if(mode === 'update'){

        }
        setModalOpen(false)
    }

    return (

        <div>
            <Header title="Fincas" />
            <div className='w-full flex flex-col justify-center items-center p-10'>
                <Buscador handler={handleFilter} />
                <ButtonRegister click={() => handleToggle('create')} />
                <FincasModal 
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleSubmit={handleSubmit}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />
                <DataTable
                    columns={columns}
                    data={records}
                    title="Fincas registradas"
                    fixedHeader
                    pagination
                    paginationComponentOptions={paginaOpciones}
                >
                </DataTable>
            </div>
                
        </div>
        
    )
}
 */