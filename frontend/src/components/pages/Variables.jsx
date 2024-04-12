import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import Buscador from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';
import { ButtonDesactivar } from '../atoms/ButtonDesactivar.jsx';
import VariablesModal from '../templates/VariablesModal.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import  axios from 'axios';

export function Variables () {

    const baseURL = 'http://localhost:3000/variables/listarvariable'

    const [datos, setData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {   
        fetchData()

    },[])

    const fetchData = async () => {
        try {
            axios.get(baseURL).then((response) => {
                console.log(response)
                setData(response.data)
            })

        } catch (error) {
            console.log('Error en el server' + error);
        }
    }

    const columns = [
        {
            name: 'Código',
            selector: row => row.v_codigo,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'fk Tipo analisis',
            selector: row => row.tipo_analisis,
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
            <ButtonActualizar click={() => handleToggle('update', row)} /> 
            <ButtonDesactivar click={() => handleDesactivar(row.v_codigo)} />
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
            axios.put(`http://localhost:3000/variables/desactivarVariable/${codigo}`, null).then((response) => {
                console.log(response.data);
            })

            if(response.status ==200) {
                setMensaje('Se desactivo con exito la varible')
                setModalAcciones(true)
                fetchData()
            }else{
                alert('Error' + error)
            }
        } catch (error) {
            alert('Error con el servidor')
        }
    }
    const handleSubmit = async (data, e  ) => {
        e.preventDefault()

        try {
            if(mode === 'create') {
                const baseURL = 'http://localhost:3000/variables/crearvariable'

                await axios.post(baseURL, data).then((response) => {
                    console.log(response)
                    if(response.status ==200 ){
                        setMensaje('Variable registrada con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })
            }else if (mode === 'update'){
                const UpdateURL = `http://localhost:3000/variables/actualizarvariable/${initialData.v_codigo}`
                await axios.put(UpdateURL, data).then((response) => {
                    console.log(response);
                    if(response.status == 200){
                        setMensaje('Se actualizó La variable con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    }
    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
  return (
    
    <div>
        <Header title="Variables" />
        <div className='w-full flex flex-col justify-center items-center p-10'>

           <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
           />
            
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            <VariablesModal 
                open={modalOpen} 
                onClose={()=>setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar Variable' : 'Actualizar variable'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
                setModalOpen={setModalOpen}
            />
            <DataTable columns={columns} data={datos} title={'Variables registradas'} />
        </div>
    </div>
  )
}