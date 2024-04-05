import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Header } from '../molecules/Header';
import VariedadesModal from './../templates/Variedades.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import Buscador from '../atoms/Buscador.jsx';



export function VistaVariedades () {
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
    const colums = [
       
        {
            name: 'Nombre',
            selector: row => row.nombre,
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
        },
        {
            name: '',
            selector: row => row.accionesDe 
        },
    ]

    const data = [
        {
           
            nombre: "Borbon rosado",
            estado: "Activo", 
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button" onClick={() => handleToggle('update')}>Actualizar</button> </> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
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
  return (
    
    <div>
        <Header title="Variedades" />
        <div className='w-full flex flex-col justify-center items-center p-10'>
            
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            <VariedadesModal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                handleSubmit={handleSubmit}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />


            <DataTable
                columns={colums}
                data={records}
                title="Variedades registradas"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}