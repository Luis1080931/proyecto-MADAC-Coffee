import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../components/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export function VistaAnalisis () {

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
            name: 'Analista',
            selector: row => row.analista,
            sortable: true
        },
        {
            name: 'Muestra',
            selector: row => row.muestra,
            sortable: true
        },
        {
            name: 'Tipo De Análisis',
            selector: row => row.tipoanalisis,
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
            codigo: 1,
            fecha: "2024-02-29",
            analista: 10330,
            muestra: 21,
            tipoanalisis: "Físico",
            estado: "Activo", 
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/analisisactualizar`}>Actualizar</Link></button> </> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
            codigo: 2,
            fecha: "2024-02-29",
            analista: 55123,
            muestra: 22,
           tipoanalisis: "Sensorial",
            estado: "Activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/analisisactualizar`}>Actualizar</Link></button> </div> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 

        },
        {
            codigo: 3,
            fecha: "2024-02-29",
            analista: 14624,
            muestra: 23,
            tipoanalisis: "Físico",
            estado: "Activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/analisisactualizar`}>Actualizar</Link></button> </div> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
            codigo: 4,
            fecha: "2024-02-29",
            analista: 15369,
            muestra: 24,
            tipoanalisis: "Sensorial",
            estado: "Activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/analisisactualizar`}>Actualizar</Link></button> </div>,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
            codigo: 5,
            fecha: "2024-02-29",
            analista: 13214,
            muestra: 25,
            tipoanalisis: "Físico",
            estado: "Inactivo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/analisisactualizar`}>Actualizar</Link></button></div> ,
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
        <Header title="Análisis" />
        <div className='w-10/12 ml-28'>
            <div className='flex justify-center items-center text-center'>
                <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                    <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                    <FaSistrix size={25} style={{ marginRight: 10 }}/>
                </div>
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/analisisregistrar`}>Registrar</Link>
                
            </button>
            <DataTable
                columns={colums}
                data={records}
                title="Análisis registrados"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}