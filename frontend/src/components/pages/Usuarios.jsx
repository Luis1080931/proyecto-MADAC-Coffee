import React, { useEffect, useState } from 'react';
import { Header } from './../molecules/Header.jsx';
import { FaSistrix } from "react-icons/fa6";
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import UsuariosModal from '../templates/Usuarios.jsx';
import DataTable from 'react-data-table-component';
import axios from 'axios';

export function Usuarios() {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    

    const columns = [
        {
            name: 'Identificacion',
            selector: row => row.identificacion,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Telefono',
            selector: row => row.telefono,
            sortable: true
        },
        {
            name: 'Correo',
            selector: row => row.correo_electronico,
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.tipo_usuario,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => (
                <button 
                    className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' 
                    type="button" 
                    onClick={() => handleToggle('update', row)}
                >
                    Actualizar
                </button>
            )
        },        
        {
            name: 'AccionesDe',
            cell: row => (
                <button 
                    className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' 
                    type="button" 
                    onClick={() => handleUpdate(row.identificacion)}
                >
                    Desactivar
                </button>
            )
        }
    ];

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const baseURL = 'http://localhost:3000/usuarios/listar';
            const response = await axios.get(baseURL, { headers: { token: token } });
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

    const handleFilter = (event) => {
        const newData = originalData.filter(row => {
            return row.correo_electronico.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setFilteredData(newData); // Actualizar los datos filtrados
    }

    const actualizar = async (userId, formData) => {
        console.log(userId)
        try {
            const baseURL = `http://localhost:3000/usuarios/actualizar/${userId}`;
            await axios.put(baseURL, formData);
            alert('Usuario actualizado exitosamente');
            setModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    }

    const handleUpdate = async (userId) => {
        console.log("ID del usuario a actualizar:", userId);
        try {
            const token = localStorage.getItem('token');
            const baseURL = `http://localhost:3000/usuarios/desactivar/${userId}`;
            await axios.put(baseURL, { headers: { token: token } });
            console.log("se desactivo correctamente el usuario");
            alert('Usuario desactivado con éxito');
            fetchData();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar usuario');
        }
    };

    const handleToggle = (mode, user) => {
        setMode(mode);
        setSelectedUser(user);
        setModalOpen(true);
    };
    
    const handleSubmit = async (formData, e) => {
        console.log(formData)
        try {
            const token = localStorage.getItem('token');
            if (mode === 'create') {
                const baseURL = 'http://localhost:3000/usuarios/registrar';
                await axios.post(baseURL, formData, { headers: { token: token } });
                alert('Usuario registrado exitosamente');
                fetchData();
            } else if (mode === 'update' && selectedUser) {
                await actualizar(selectedUser.identificacion, formData);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    return (
        <>
            <div><Header title="Usuarios"/></div>        
            <div>
                
                <div className='w-10/12 ml-28'>
                    <div className='flex justify-center items-center text-center'>
                        <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                            <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                            <FaSistrix size={25} style={{ marginRight: 10 }} />
                        </div>
                    </div>
                    <ButtonRegister  click={() => handleToggle('create')} />
                    <UsuariosModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        handleSubmit={handleSubmit}
                        selectedUser={selectedUser}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    />

                    <div style={{ height: '80vh', width: '100%' }}> 
                        <DataTable
                            columns={columns}
                            data={Array.isArray(filteredData) ? filteredData : []}
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
