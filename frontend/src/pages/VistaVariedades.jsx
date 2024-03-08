import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../components/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export function VistaVariedades () {

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
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/variedadesactualizar`}>Actualizar</Link></button> </> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
           nombre: "Castillo",
            estado: "Activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/variedadesactualizar`}>Actualizar</Link></button> </div> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 

        },
        
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
        <div className='w-10/12 ml-28'>
            <div className='flex justify-center items-center text-center'>
                <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                    <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                    <FaSistrix size={25} style={{ marginRight: 10 }}/>
                </div>
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/variedadesregistrar`}>Registrar</Link>
                
            </button>
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