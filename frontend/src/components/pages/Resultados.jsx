import React, { useEffect, useRef, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import { Buscador } from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import ResultadosModal from './../templates/Resultados.jsx';
import axios from 'axios';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';
import { Datatable } from '../organisms/Datatable.jsx';
import { ButtonDesactivar } from '../atoms/ButtonDesactivar.jsx';


export function Resultados () {

    const baseURL = 'http://localhost:3000/resultados/listar'
    const token = localStorage.getItem('token')

    const [datos, setData] = useState([])

    useEffect(() => {
        try {
            axios.get(baseURL, {headers: {token:token}}).then((response) => {
                console.log(response)
                setData(response.data)
            })
        } catch (error) {
            console.log('Error de servidor' + error)
        }
    }, [token])

    const columns = [
        {
            name:  'Id',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true
        },
        {
            name: 'Análisis',
            selector: row => row.analisis,
            sortable: true
        },
        {
            name: 'Variable',
            selector: row => row.variable,
            sortable: true
        },
        {
            name: 'Valor',
            selector: row => row.valor,
            sortable: true
        },
        {
            name: 'Observaciones',
            selector: row => row.observaciones, 
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => <><ButtonActualizar click={() => handleToggle('update', row)} /> <ButtonDesactivar click={() => handleDesactivar(row.codigo) } /></> 
        }
    ]

    function handleFilter (event){
        const newData = datos.filter(row => {
            return row.valor.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    const handleDesactivar = (idResultado) => {
        try {
            axios.put(`http://localhost:3000/resultados/desactivar/${idResultado}`, null, {headers: {token: token}}).then((response) => {
            console.log(response.data)
            if(response.status==200){
                alert('Resultado desactivado con exito')
            }else{
                alert('Error')
            }
            
        })
        } catch (error) {
            alert('Error de servidor' + error)
        }
        
    }

    const [modalOpen, setModalOpen] = useState(false)

    const handleSubmit = async (e, data) => {
        e.preventDefault()

        try {
            if(mode == 'create'){
                axios.post('http://localhost:3000/resultados/registrar', data).then((response) => {
                    console.log(response)
                    alert('Resulatdo registrado con exito')
                    setModalOpen(false)
                })
            }else if(mode == 'update'){
                axios.put(`http://localhost:3000/resultados/actualizar/${initialData.codigo}`,  data, {headers: {token: token}}).then((response) => {
                    console.log(response)
                    alert('Resulatdo actualizado con exito')
                    setModalOpen(false);
                })
            }
        } catch (error) {
            console.log('Error del servidor' + error)
            alert('Error del servidor')
        }
    }


    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }

  return (
    
    <div>
        <Header title="Resultados" />
        <div className='w-full flex flex-col justify-center items-center p-10'>
            
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            <ResultadosModal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar resultados' : 'Actualizar resultados'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
                setModalOpen={false}
                />

            <Datatable columns={columns} data={datos} title={'Resultados registrados'} />
            
        </div>
    </div>
  )
}