import React, { useState, useEffect} from 'react'
import { Header } from './../molecules/Header.jsx'
import MuestrasModal from '../templates/MuestrasModal.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organisms/TableMuestras.jsx';


export function Muestras () {

    const baseURL = 'http://localhost:3000/muestras/listarMuestra'

    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [muestras, setMuestras] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const response = await axios.get(baseURL, {headers: {token: token}})
            const formattedMuestras = response.data.map((result) => ({
                ...result,
                fecha: formatDate(result.fecha),
            }));
            setMuestras(formattedMuestras)

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES')
    };
    const data = [
        {
            uid : 'codigo',
            name: 'Código',
            sortable: true
        },
        {
            uid: 'fecha',
            name: 'Fecha',
            render: (fecha) => formatDate(fecha),
            sortable: true
        },
        {
            uid: 'cantidad',
            name: 'Cantidad',
            sortable: true
        },
        {
            uid: 'quien_recibe',
            name: 'Quien Recibe',
            sortable: true
        },
        {
            uid: 'proceso_fermentacion',
            name: 'Proceso de Fermentación',
            sortable: true
        },
        {
            uid: 'humedad_cafe',
            name: 'Humedad Café',
            sortable: true
        },
        {
            uid: 'altura_MSNM',
            name: 'Altura MSNM',
            sortable: true
        },
        {
            uid: 'tipo_secado',
            name: 'Tipo de Secado',
            sortable: true
        },
        {
            uid: 'observaciones',
            name: 'Observaciones',
            sortable: true
        },
        {
            uid: 'fk_lote',
            name: 'Lote',
            sortable: true
        },
        {
            uid: 'estado',
            name: 'Estado',
            sortable: true
        },
        {
            uid:'actions',
            name: "Acciones",
            sortable:true
        }
    ];


    const handleDesactivar = (codigo) => {
        try {
            axios.put(`http://localhost:3000/muestras/desactivarMuestra/${codigo}`, null, {headers:{token: token}}).then((response) => {
                console.log(response.data);
            
                if(response.status == 200) { 
                    setMensaje('Se desactivo con éxito la Muestra')
                    setModalAcciones(true)
                    fetchData()
                } else {
                    alert('Error' + error)
                }
            })
            } catch (error) {
                console.log('Erorr' + error)
            }
    }
    const id = localStorage.getItem('idUser')
    
    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm); 
        e.preventDefault()

        try {
            if (mode === 'create') {
                const BaseURL = 'http://localhost:3000/muestras/crearMuestra'

                await axios.post(BaseURL, datosForm, {headers: {token: token}}).then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        setMensaje('Muestra registrada con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })

            } else if (mode === 'update') {
                const UpdateURL = `http://localhost:3000/muestra/actualizar/${id}`
                await axios.put(UpdateURL, datosForm).then((response) => {
                    console.log(response);

                    if (response.status == 200) {
                        setMensaje('Se actualizó La Muestra con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    } else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)
        } catch (error) {
            console.log('Error en el servidor' + error)
            alert('Error en el servidor ' + error)
        }
    }
    

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }

  return (
    
    <div>
        <Header title="Muestras" />
        <div className='w-full max-w-[90%] ml-28 items-center p-10'>
            <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
            />
            <MuestrasModal 
                open={modalOpen} 
                onClose={()=>setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar Muestra' : 'Actualizar Muestra'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
            />
           <Ejemplo
                clickDesactivar={handleDesactivar}
                clickEditar={() => handleToggle('update', id)}
                clickRegistrar={() => handleToggle('create')}
                data={data}
                muestras={muestras}
           />
        </div>
    </div>
  )
}