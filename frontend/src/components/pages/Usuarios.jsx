import React, { useEffect, useState } from 'react';
import { Header } from './../molecules/Header.jsx';
import UsuariosModal from '../templates/Usuarios.jsx';
import axios from 'axios';
import Ejemplo from '../organisms/TableUsers.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';

export function Usuarios() {

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [selectedUser, setSelectedUser] = useState(null);
    const [results, setResults] = useState([]);
    const [modalAcciones, setModalAcciones] = useState([]);
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
            
            axios.get('http://localhost:3000/usuarios/listar', null, {headers: {token: token}}).then((response) => {
                console.log(response.data)
                setResults(response.data[0])
            })

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

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
                setModalOpen(false);

            } else if (mode === 'update' && selectedUser) {
                await actualizar(selectedUser.identificacion, formData);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

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
                        clickEditar={() => handleToggle('update')}
                        data={data}
                        results={results}
                    />
                </div>
        </>
    );
}

