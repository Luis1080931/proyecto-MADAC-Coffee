import React, { useEffect, useState } from 'react';
import { Header } from '../molecules/Header';
import TableVariedades from '../organisms/TableVariedades';
import AccionesModal from '../organisms/ModalAcciones';
import VariedadesModal from '../templates/Variedades';
import axiosClient from '../axiosClient';

const VistaVariedades = () => {

    const [results, setResults] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAccionesOpen, setModalAccionesOpen ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/variedades/listar');
            console.log("variedades", response.data)
            setResults(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const data = [
        {
            uid: "codigo",
            name: "CODIGO",
            sortable: true
        },
        { 
            uid: "nombre",
            name: "NOMBRE",
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

    const handleToogle = (mode, initialData) => {
        setMode(mode);
        setInitialData(initialData);
        setModalOpen(true);
    }

    const id = localStorage.getItem('idUser')

    const handleSubmit = async (data, e) => {
        e.preventDefault()
        try {
            if(mode == 'create'){
                const response = await axiosClient.post('/variedades/registrar', data);
                console.log(response.data)
                if(response.status==201){
                    setMensaje(response.data.message)
                    setModalAccionesOpen(true)
                    setModalOpen(false)
                    fetchData();
                }else{
                    alert('Error')
                }
            }else if(mode == 'update'){
                const response = await axiosClient.put(`/variedades/actualizar/${id}`, data);
                console.log(response.data)
                if(response.status==201){
                    setMensaje(response.data.message)
                    setModalAccionesOpen(true)
                    setModalOpen(false)
                    fetchData();
                }else{
                    alert('Error')
                }
            }
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const handleDesactivar = async (id) => {
        await axiosClient.put(`/variedades/desactivar/${id}`, null).then((response) => {
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
        axiosClient.put(`/variedades/activar/${codigo}`).then((response) => {
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

    return (
        <div>
            <Header title='Variedades' />
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>

                <AccionesModal 
                    isOpen={modalAccionesOpen}
                    onClose={() => setModalAccionesOpen(false)}
                    label={mensaje}
                />
                
                <VariedadesModal 
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar variedades' : 'Actualizar variedades'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    mode={mode}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                />

                <TableVariedades 
                    clickDesactivar={handleDesactivar}
                    clickActivar={handleActivar}
                    clickEditar={() => handleToogle('update', id)}
                    clickRegistrar={() => handleToogle('create')}
                    data={data}
                    results={results}
                />

            </div>
        </div>
    );
}

export default VistaVariedades;
