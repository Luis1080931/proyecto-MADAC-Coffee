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
            cell: () => <><ButtonActualizar click={() => handleToggle('update')} /> <ButtonDesactivar /></> 
        }
    ]

    function handleFilter (event){
        const newData = datos.filter(row => {
            return row.valor.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [mode, setMode] = useState('create')

    const handleToggle = (mode) => {
        setMode(mode)
        setModalOpen(true)
        if(mode === 'update'){
            
        }
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
                />

            <Datatable columns={columns} data={datos} title={'Resultados registrados'} />
            
        </div>
    </div>
  )
}