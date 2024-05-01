import React, { useEffect, useState } from 'react';
import { Header } from './../molecules/Header.jsx';
import UsuariosModal from '../templates/Usuarios.jsx';
import axios from 'axios';
import Ejemplo from '../organisms/TableUsers.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import axiosClient from '../axiosClient.js';

export function Usuarios() {

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [selectedUser, setSelectedUser] = useState(null);
    const [results, setResults] = useState([]);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);
    

    const data = [
        { 
            uid: "identificacion",
            name: "Identificación",
            sortable: true 
        },
        { 
            uid: "nombre",
            name: "Nombre",
            sortable: true,
        },
        { 
            uid: "telefono",
            name: "Telefono", 
            sortable: true 
        },
        { 
            uid: "correo_electronico",
            name: "Correo electrónico",
            sortable: true 
        },
        { 
            uid: "tipo_usuario",
            name: "Rol",
            sortable: true 
        },
        { 
            uid: "estado",
            name: "Estado",
            sortable: false 
        },
        { 
            uid: 'actions',
            name: "Acciones",
            sortable: true,
            
        },
      ];

    const fetchData = async () => {
        try {
            
            axiosClient.get('/usuarios/listar', null).then((response) => {
                console.log(response.data)
                setResults(response.data.usuarios)
            })

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const actualizar = async (userId, formData) => {
        console.log(userId)
        try {
            await axiosClient.put(`/usuarios/actualizar/${userId}`, formData).then((response) => {
                console.log(response)

                if(response.status == 201){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalOpen(false)
                    fetchData()
                }else{
                    alert('Error: ')
                }
                
            })
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    }

    const handleUpdate = async (userId) => {
        console.log("ID del usuario a actualizar:", userId);
        try {
            await axiosClient.put(`/usuarios/desactivar/${userId}`, null).then((response) => {
                console.log("se desactivo correctamente el usuario");

                if(response.status == 201) {
                    setMensaje(response.data.message);
                    setModalAcciones(true)
                    setModalOpen(false)
                    fetchData();
                }else{
                    alert('Error: ')
                }
                
            })
            
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
            if (mode === 'create') {
                await axiosClient.post('/usuarios/registrar', formData).then((response) => {
                    console.log(response.data)

                    if(response.status === 201){
                        setMensaje(response.data.message)
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData();
                    }else{
                        alert('Error: ')
                    }
                    
                })

            } else if (mode === 'update' && selectedUser) {
                await actualizar(selectedUser.identificacion, formData);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    const handleActivar = async (identificacion) => {
        await axiosClient.put(`/usuarios/activar/${identificacion}`).then((response) => {
            console.log(response.data)
            if(response.status == 200){
                setMensaje(response.data.message)
                setModalAcciones(true)
                fetchData()
            }else{
                setMensaje(response.data.message)
                setModalAcciones(true)
                fetchData()
            }
        })
    }

    return (
        <>
            <Header title="Usuarios"/>       
           
                
                <div className='w-full max-w-[90%] ml-28 items-center p-10'>

                    <AccionesModal 
                        isOpen={modalAcciones}
                        onClose={() => setModalAcciones(false)}
                        label={mensaje}
                    />
                   
                    <UsuariosModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        handleSubmit={handleSubmit}
                        selectedUser={selectedUser}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    />

                    <Ejemplo
                        clickRegistrar={() => handleToggle('create')}
                        clickDesactivar={handleUpdate}
                        clickActivar={handleActivar}
                        clickEditar={() => handleToggle('update')}
                        data={data}
                        results={results}
                    />
                </div>
        </>
    );
}

