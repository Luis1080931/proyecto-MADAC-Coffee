import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../components/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

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
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to='/lotesactualizar'>Desactivar</Link></button> <button  type="button" ></button></div> ,
        },
        {
            codigo: 1,
            arboles: "300",
            finca: 1,
            Variedad: 3,

            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            arboles: "300",
            finca: 1,
            Variedad: 3,

            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            arboles: "300",
            finca: 1,
            Variedad: 3,

            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            arboles: "300",
            finca: 1,
            Variedad: 3,

            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
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
        <Header title="Lotes" />
        <div className='w-10/12 ml-28'>
            
            <div className='w-96 ml-80 bg-[#E5E5E5] flex justify-center items-center m-8 border-2 rounded-lg border-black'>
                <input className='p-2 bg-[#E5E5E5] text-black rounded-lg w-96' type="text" onChange={handleFilter} placeholder='Buscar' />
                <FaSistrix size={25} />
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/lotesregistrar`}>Registrar</Link>
            </button>
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
