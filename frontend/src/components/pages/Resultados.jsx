import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import { Link } from 'react-router-dom';
import { Buscador } from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';   
import ResultadosModal from '../organisms/ResultadosModal.jsx';

export function Resultados () {


    const colums = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true
        },
        {
            name: 'Analisis',
            selector: row => row.analisis,
            sortable: true
        },
        {
            name: 'Variable',
            selector: row => row.variable,
            sortable: true
        },
        {
            name: 'Observaciones',
            selector: row => row.observaciones,
            sortable: true
        },
        {
            name: 'Valor',
            selector: row => row.valor,
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
            name: 'AccionesDe',
            selector: row => row.accionesDe 
        },
    ]

    const data = [
        {
            codigo: 1,
            fecha: "2024-02-29",
            analisis: 1,
            variable: "Peso (g)",
            observaciones: "Peso adecuado",
            valor: "30 g",
            estado: "activo", 
            acciones: <>
                <ButtonActualizar link={'/resultadosactualizar'} />
                
                <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> ,
                accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button>
            </> 
        },
        {
            codigo: 2,
            fecha: "2024-02-29",
            analisis: 1,
            variable: "Peso (g)",
            observaciones: "Peso adecuado",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/resultadosactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></div> 
        },
        {
            codigo: 3,
            fecha: "2024-02-29",
            analisis: 1,
            variable: "Peso (g)",
            observaciones: "Peso adecuado",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/resultadosactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></div> 
        },
        {
            codigo: 4,
            fecha: "2024-02-29",
            analisis: 1,
            variable: "Cantidad (g)",
            observaciones: "Peso adecuado",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/resultadosactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></div> 
        },
        {
            codigo: 5,
            fecha: "2024-02-29",
            analisis: 1,
            variable: "Peso (g)",
            observaciones: "Peso adecuado",
            valor: "30 g",
            estado: "inactivo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/resultadosactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></div> 
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
  return (
    
    <div>
        <Header title="Resultados" />
        <div className='w-full flex flex-col justify-center items-center p-10'>
            
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => setModalOpen(true)} />
            <ResultadosModal open={modalOpen} onClose={() => setModalOpen(false)} />

            <DataTable
                columns={colums}
                data={records}
                title="Resultados registrados"
                fixedHeader 
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
            
        </div>
    </div>
  )
}