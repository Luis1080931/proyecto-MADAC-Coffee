import React, { useEffect, useState } from 'react';
import { Header } from '../molecules/Header';
import TableVariedades from '../organisms/TableVariedades';
import AccionesModal from '../organisms/ModalAcciones';
import VariedadesModal from '../templates/Variedades';
import axios from 'axios';

const VistaVariedades = () => {

    const [results, setResults] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAccionesOpen, setModalAccionesOpen ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')

    const token = localStorage.getItem('token');

    const handleDesactivar = async (id) => {
        await axios.put(`http://localhost:3000/variedades/desactivar/${id}`, null, {headers: {token: token}}).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje('Se desactivó con éxito la variedad')
                setModalAccionesOpen(true)
                setModalOpen(false)
                fetchData();
            }else{
                alert('Error')
            }
            
        });
    };

    const url = 'http://localhost:3000/variedades/listar';

    const fetchData = async () => {
        try {
            const response = await axios.get(url, {headers: {token: token}});
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
                const response = await axios.post('http://localhost:3000/variedades/registrar', data, {headers: {token: token}});
                console.log(response.data)
                if(response.status==201){
                    setMensaje('Se creó con éxito la variedad')
                    setModalAccionesOpen(true)
                    setModalOpen(false)
                    fetchData();
                }else{
                    alert('Error')
                }
            }else if(mode == 'update'){
                const response = await axios.put(`http://localhost:3000/variedades/actualizar/${id}`, data, {headers: {token: token}});
                console.log(response.data)
                if(response.status==201){
                    setMensaje('Se actualizó con éxito la variedad')
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
