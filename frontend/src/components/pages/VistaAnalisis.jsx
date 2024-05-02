import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../molecules/Header.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import AnalisisModal from '../templates/Analisis.jsx';
import Ejemplo from '../organisms/TableAnalisis.jsx';
import axiosClient from '../axiosClient.js';

function VistaAnalisis() {
    const [results, setResults] = useState([]);
    const [modalAccionesOpen, setModalAccionesOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)

    const data = [
        { 
            uid: "codigo",
            name: "CÓDIGO",
            sortable: true 
        },
        { 
            uid: "analista",
            name: "ANALISTA" ,
            sortable: true 
        },
        { 
            uid: "fecha",
            name: "FECHA", 
            sortable: true,
            render: (fecha) => formatDate(fecha)
        },
        { 
            uid: "muestra",
            name: "MUESTRA",
            sortable: true
        },
        { 
            uid: "tipo_analisis",
            name: "TIPO ANALISIS",
            sortable: true
        },
        { 
            uid: "estado",
            name: "ESTADO",
            sortable: true
        },
        { 
            uid: "actions",
            name: "ACCIONES",
            sortable: true
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES'); // Puedes ajustar el idioma según tu preferencia
      };

    const token = localStorage.getItem('token');

    const handleDesactivar = async (id) => {
        await axiosClient.put(`/analisis/desactivar/${id}`, null).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje(response.data.message)
                setModalAccionesOpen(true)
                setModalOpen(false)
                fetchData();
            }else{
                alert('Error')
            }
            
        });
    }

    const handleActivar = async (codigo) => {
        axiosClient.put(`/analisis/activar/${codigo}`).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje(response.data.message)
                setModalAccionesOpen(true)
                setModalOpen(false)
                fetchData();
            }else{
                setMensaje(response.data.message)
                setModalAccionesOpen(true)
            }
        })
    }

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/analisis/listar')

            const formattedResults = response.data.map((result) => ({
                ...result,
                fecha: formatDate(result.fecha),
              }));
              setResults(formattedResults);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }

    const id = localStorage.getItem('idUser')

    const handleSubmit = (data, e) => {
        e.preventDefault()
        try {
            if(mode == 'create'){
                axiosClient.post('/analisis/registrar', data).then((response) => {
                    console.log(response.data)
                    if(response.status == 201){
                        setMensaje(response.data.message)
                        setModalAccionesOpen(true)
                        setModalOpen(false)
                        fetchData();
                    }else{
                        alert('Error en el registro')
                    }
                    
                });
            }else if(mode == 'update'){ 
                axiosClient.put(`/analisis/actualizar/${id}`,data).then((response) => {
                    console.log(response.data)
                    if(response.status == 201){
                        setMensaje(response.data.message)
                        setModalAccionesOpen(true)
                        setModalOpen(false)
                        fetchData();
                    }else{
                        alert('Error en el registro')
                    }
                    
                });
            }
        } catch (error) {
           console.log('Error de servidor' + error); 
        }
    }

    return (
        <div>
            <Header title='Análisis físico y sensorial' />
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
                <AccionesModal 
                    isOpen={modalAccionesOpen}
                    onClose={() => setModalAccionesOpen(false)}
                    label={mensaje}
                />
                
                <AnalisisModal 
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar Análisis' : 'Actualizar Análisis'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    mode={mode}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                />
                <Ejemplo 
                    clickDesactivar={handleDesactivar}
                    clickActivar={handleActivar}
                    clickEditar={() => handleToggle('update', id)}
                    clickRegistrar={() => handleToggle('create')}
                    data={data}
                    results={results}
                />
            </div>
        </div>
    );
}

export default VistaAnalisis