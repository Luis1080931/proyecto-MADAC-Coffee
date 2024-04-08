import React, { useEffect, useState } from 'react';
import { Header } from './../molecules/Header.jsx';
import { FaSistrix } from "react-icons/fa6";
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import UsuariosModal from '../templates/Usuarios.jsx';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Importa el componente DataGrid desde la biblioteca correspondiente

const columns = [
    {
        field: 'identificacion',
        headerName: 'Identificacion',
        flex: 1,
        sortable: true
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        flex: 1,
        sortable: true
    },
    {
        field: 'telefono',
        headerName: 'telefono',
        flex: 1,
        sortable: true
    },
    {
        field: 'correo_electronico',
        headerName: 'Correo',
        flex: 1,
        sortable: true
    },
    {
        field: 'tipo_usuario',
        headerName: 'Rol',
        flex: 1,
        sortable: true
    },
    {
        field: 'estado',
        headerName: 'Estado',
        flex: 1,
        sortable: true
    },
];

export function Usuarios() {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');



    const handleToggle = (mode) => {
        setMode(mode);
        setModalOpen(true);
        if (mode === 'update') {
            // Lógica para manejar la actualización
        }
    }
    const token = localStorage.getItem('token')
    const baseURL = 'http://localhost:3000/usuarios/listar';

    const fetchData = async () => {
        try {
            const response = await axios.get(baseURL, {headers: {token:token}});
            const dataWithIds = response.data.usuarios.map((usuario, index) => ({
                ...usuario,
                id: index + 1 // Puedes usar el índice del array + 1 como id
            }));
            setOriginalData(dataWithIds);
            setFilteredData(dataWithIds);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    function handleFilter(event) {
        const newData = originalData.filter(row => {
            return row.correo.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setFilteredData(newData); // Actualizar los datos filtrados
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'create') {
            const createURL = 'http://localhost:3000/usuarios/registrar';

            axios.post(createURL).then((response) => {
                    console.log("Registrado con éxito");
                    setModalOpen(false);
                })
                .catch(error => console.error('Error al registrar:', error));
        } else if (mode === 'update') {
            // Lógica para manejar la actualización
        }
        setModalOpen(false);
    }

    return (
        <>
        <div>
            <Header title="Usuarios" />
            <div className='w-10/12 ml-28'>
                <div className='flex justify-center items-center text-center'>
                    <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                        <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                        <FaSistrix size={25} style={{ marginRight: 10 }} />
                    </div>
                </div>
                <ButtonRegister click={() => handleToggle('create')} />
                <UsuariosModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleSubmit={handleSubmit}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />
                <div style={{ height: '80vh', width: '100%' }}> 
                    <DataGrid style={{ height: '100%', width: '100%' }}
                        columns={columns}
                        rows={Array.isArray(filteredData) ? filteredData : []}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </div>
        </>
    );
}


