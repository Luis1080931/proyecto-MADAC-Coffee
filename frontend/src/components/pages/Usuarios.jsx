import React, { useEffect, useState } from 'react';
import { Header } from './../molecules/Header.jsx';
import UsuariosModal from '../templates/Usuarios.jsx';
import axios from 'axios';
import Ejemplo from '../organisms/Table.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';

export function Usuarios() {
    const baseURL = 'http://localhost:3000/usuarios/listar';
    const token = localStorage.getItem('token');

    const [filteredData, setFilteredData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(baseURL, { headers: { token: token } });
            const dataWithIds = response.data.usuarios.map((usuario, index) => ({
                ...usuario,
                id: index + 1 // Puedes usar el índice del array + 1 como id
            }));
            setFilteredData(dataWithIds);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    

    const data = [
        {
          uid: "codigo",
          name: "Código",
          sortable: true,
          selector: row => row.identificacion
        },
        {
          uid: "nombre",
          name: "Nombre",
          sortable: true,
          selector: row => row.nombre
        },
        {
          uid: "telefono",
          name: "Teléfono",
          sortable: true,
          selector: row => row.telefono
        },
        {
          uid: "correo",
          name: "Correo",
          sortable: true,
          selector: row => row.correo_electronico
        },
        {
          uid: "rol",
          name: "Rol",
          sortable: true,
          selector: row => row.tipo_usuario
        },
        {
          uid: "estado",
          name: "Estado",
          sortable: true,
          selector: row => row.estado
        },
        {
          uid: "actions",
          name: "Acciones",
          sortable: true,
        }
      ];
      

    

    const actualizar = async (userId, formData) => {
        try {
            const baseURL = `http://localhost:3000/usuarios/actualizar/${userId}`;
            const response = await axios.put(baseURL, formData);
            if (response.status === 200) {
                setMensaje('Se actualizó el resultado con éxito');
                setModalAcciones(true);
                setModalOpen(false);
                fetchData();
            } else {
                alert('Error de actualizar');
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const handleDesactivar = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const baseURL = `http://localhost:3000/usuarios/desactivar/${userId}`;
            const response = await axios.put(baseURL, null, { headers: { token: token } });
            if (response.status === 200) {
                setMensaje('Se desactivó con éxito el resultado');
                setModalAcciones(true);
                fetchData();
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar usuario');
        }
    };


    const handleToggle = (mode, user) => {
        console.log(holaaa);
        setMode(mode);
        setModalOpen(true);
        setInitialData(user);
    };

    const handleSubmit = async (formData, e) => {
        try {
            const token = localStorage.getItem('token');
            if (mode === 'create') {
                const baseURL = 'http://localhost:3000/usuarios/registrar';
                const response = await axios.post(baseURL, formData, { headers: { token: token } });
                if (response.status === 200) {
                    setMensaje('Resultado registrado con éxito');
                    setModalAcciones(true);
                    setModalOpen(false);
                    fetchData();
                } else {
                    alert('Error de registro');
                }
            } else if (mode === 'update') {
                await actualizar(initialData.identificacion, formData);
            }
            setModalOpen(false);
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    return (
        <>
            <div><Header title="Usuarios"/></div>
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />

                <UsuariosModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar resultados' : 'Actualizar resultados'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    handleSubmit={handleSubmit}
                    mode={mode}
                />
                <Ejemplo
                    clickDesactivar={handleDesactivar}
                    clickEditar={() => handleToggle('update', user)}
                    clickRegistrar={() => handleToggle('create')}
                    data={data}
                    results={filteredData}
                />
            </div>
        </>
    );
}
