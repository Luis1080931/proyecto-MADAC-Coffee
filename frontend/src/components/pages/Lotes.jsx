import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import LotesModal from '../templates/Lotes.jsx';
import { Link } from 'react-router-dom';
import Buscador from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';

export function Lotes () {

    const colums = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Numero de arboles',
            selector: row => row.arboles,
            sortable: true
        },
        {
            name: 'Finca',
            selector: row => row.finca,
            sortable: true
        },
        {
            name: 'Variedad',
            selector: row => row.Variedad,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            selector: row => row.acciones
        }
    ]

    const data = [
        {
            codigo: 1,
            arboles: "300",
            finca: 1,
            Variedad: 3,
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button" onClick={() => handleToggle('update')}>Actualizar</button> <button  type="button" ></button></div>

        }
    ]

    const paginaOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    }

    const [records, setRecords] = useState(data)
    
    function handleFilter (event){
        const newData = data.filter(row => {
            return row.variable.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [mode, setMode] = useState('create')

    const handleToggle = (mode) => {
        setMode(mode)
        setModalOpen(true)
        if(mode === 'update'){
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mode === 'create'){
            const baseURL = 'http://localhost:3000/resultados/registrar'

            axios.post(baseURL).then((response) => {
                console.log("Registrado con exito")
                setModalOpen(false)
            })
        }else if(mode === 'update'){

        }
        setModalOpen(false)
    }

  return (
    
    <div>
        <Header title="Lotes" />
        <div className='w-full flex flex-col justify-center items-center p-10'>
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            <LotesModal 
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                handleSubmit={handleSubmit}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
            />
            <DataTable
                columns={colums}
                data={records}
                title="Lotes registrados"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}
