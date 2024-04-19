import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../molecules/Header.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import AnalisisModal from '../templates/Analisis.jsx';
import Ejemplo from '../organisms/TableAnalisis.jsx';
import { render } from 'react-dom';

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
        await axios.put(`http://localhost:3000/analisis/desactivar/${id}`, null, {headers: {token: token}}).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje('Se desactivó con exito el análisis')
                setModalAccionesOpen(true)
                setModalOpen(false)
                fetchData();
            }else{
                alert('Error')
            }
            
        });
    };

    const url = 'http://localhost:3000/analisis/listar';

    const fetchData = async () => {
        try {
            const response = await axios.get(url, {headers: {token: token}})

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
                const baseURL = 'http://localhost:3000/analisis/registrar';
                axios.post(baseURL, data, {headers: {token: token}}).then((response) => {
                    if(response.status == 200){
                        console.log(response.data)
                        setMensaje(response.data.message)
                        setModalAccionesOpen(true)
                        setModalOpen(false)
                        fetchData();
                    }else{
                        alert('Error en el registro')
                    }
                    
                });
            }else if(mode == 'update'){
                const updateURL = `http://localhost:3000/analisis/actualizar/${id}`
                axios.put(updateURL,data, {headers: {token: token}}).then((response) => {
                    if(response.status == 200){
                        console.log(response.data)
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
            <Header title='Análisis' />
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