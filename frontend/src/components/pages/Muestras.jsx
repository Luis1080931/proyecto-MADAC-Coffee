import React, { useState, useEffect} from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import Buscador from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';
import { ButtonDesactivar } from '../atoms/ButtonDesactivar.jsx';
import MuestrasModal from '../templates/MuestrasModal.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import axios from 'axios';

export function Muestras () {

    const baseURL = 'http://localhost:3000/muestra/listar'

    const [datos, setData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            axios.get(baseURL).then((response) => {
                console.log(response)
                setData(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }
    const columns = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => new Date(row.fecha).toLocaleDateString(),
            sortable: true
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad,
            sortable: true
        },
        {
            name: 'Quien Recibe',
            selector: row => row.quien_recibe, 
            sortable: true
        },
        {
            name: 'Proceso de Fermentación',
            selector: row => row.proceso_fermentacion, 
            sortable: true
        },
        {
            name: 'Humedad Café',
            selector: row => row.humedad_cafe, 
            sortable: true
        },
        {
            name: 'Altura MSNM',
            selector: row => row.altura_MSNM, 
            sortable: true
        },
        {
            name: 'Tipo de Secado',
            selector: row => row.tipo_secado, 
            sortable: true
        },
        {
            name: 'Observaciones',
            selector: row => row.observaciones,
            sortable: true
        },
        {
            name: 'fk Lote',
            selector: row => row.fk_lote, 
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => 
            <>
            <ButtonActualizar click={() => handleToggle('update', row)}/>
            <ButtonDesactivar click={() => handleDesactivar(row.codigo)}/>
            </>
        }
    ]

    function handleFilter (event){
        const newData = datos.filter(row => {
            return row.valor.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    const handleDesactivar = (codigo) => {
        try {
            axios.put(`http://localhost:3000/muestra/desactivar/${codigo}`, null).then((response) => {
                console.log(response.data);
                })

                if(response.status == 200) { 
                    setMensaje('Se desactivo con éxito la Muestra')
                    setModalAcciones(true)
                    fetchData()
                } else {
                    alert('Error' + error)
                }
            } catch (error) {
                alert('Error con el servidor')
            }
    }
    
    const handleSubmit = async (data, e) => {
        e.preventDefault()

        try {
            if (mode === 'create') {
                const BaseURL = 'http://localhost:3000/muestra/crearmuestra'

                await axios.post(BaseURL, data).then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        setMensaje('Muestra registrada con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })
            } else if (mode === 'update') {
                const UpdateURL = `http://localhost:3000/muestra/actualizar/${initialData.codigo}`
                await axios.put(UpdateURL, data).then((response) => {
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
            alert('Se desactivo la muestra con exito ')
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
        <div className='w-full flex flex-col justify-center items-center p-10'>
            <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
            />
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            <MuestrasModal 
                open={modalOpen} 
                onClose={()=>setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar Muestra' : 'Actualizar Muestra'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
                setModalOpen={setModalOpen}
            />
            <DataTable columns={columns} data={datos} title={'Muestras registradas'} />
        </div>
    </div>
  )
}