import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import VariablesModal from '../templates/VariablesModal.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import  axios from 'axios';
import Ejemplo from '../organisms/TableVariable.jsx';
import axiosClient from '../axiosClient.js';

export function Variables () {

    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [variables, setVariables] = useState([])

    useEffect(() => {   
        fetchData()
    },[])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            axiosClient.get('/variables/listarvariable').then((response) => {
                console.log(response.data)
                setVariables(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'v_codigo',
            name: 'Código',
            sortable: true
        },
        {
            uid: 'nombre',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'tipo_analisis',
            name: 'Tipo analisis',
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
            axiosClient.put(`/variables/desactivarVariable/${codigo}`, null).then((response) => {
                console.log(response.data);
            

            if(response.status == 200) {
                setMensaje(response.data.message)
                setModalAcciones(true)
                fetchData()
            }else{
                alert('Error' + error)
            }
        })
        } catch (error) {
            alert('Error con el servidor')
        }
    }

    const id = localStorage.getItem('idUser')

    const handleSubmit = async (datosForm, e  ) => {
        console.log(datosForm);
        e.preventDefault()

        try {
            if(mode === 'create') {

                await axiosClient.post('/variables/crearvariable', datosForm).then((response) => {
                    console.log(response)
                    if(response.status == 200 ){
                        setMensaje(response.data.message)
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })
            }else if (mode === 'update'){
                await axiosClient.put(`/variable/actualizar/${id}`, datosForm).then((response) => {
                    console.log(response);

                    if(response.status == 200){
                        setMensaje(response.data.message)
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
        <div className='w-full max-w-[90%] ml-28 items-center p-10'>

           <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
           />
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
            <Ejemplo
                clickDesactivar={handleDesactivar}
                clickEditar={() => handleToggle('update', id)}
                clickRegistrar={() => handleToggle('create')}
                data={data}
                variables={variables}
           />
        </div>
    </div>
  )
}