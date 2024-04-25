import React, { useEffect, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import VariablesModal from '../templates/VariablesModal.jsx';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import  axios from 'axios';
import Ejemplo from '../organisms/TableVariable.jsx';

export function Variables () {

    const baseURL = 'http://localhost:3000/variable/listar'

    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [variables, setVariables] = useState([])

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try {
            axios.get(baseURL).then((response) => {
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
            name: 'fk Tipo analisis',
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

    const handleDesactivar = (v_codigo) => {
        try {
            axios.put(`http://localhost:3000/variable/desactivar/${v_codigo}`, null).then((response) => {
                console.log(response.data);
                const mensaje = response.data.message;

            if(response.status == 200) {
                const nuevoEstado = mensaje.split("'")[1]; 
                setMensaje(`Se cambió el estado de la variable a ${nuevoEstado} con exito`)
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
                const baseURL = 'http://localhost:3000/variable/crear'

                await axios.post(baseURL, datosForm).then((response) => {
                    console.log(response)
                    if(response.status == 200 ){
                        setMensaje('Variable registrada con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })
            }else if (mode === 'update'){
                const UpdateURL = `http://localhost:3000/variable/actualizar/${id}`
                await axios.put(UpdateURL, datosForm).then((response) => {
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
            alert('Se desactivo la variable con exito')
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