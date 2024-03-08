import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../components/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export function Fincas () {

    const colums = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Dimensiones mt2',
            selector: row => row.dimension,
            sortable: true
        },
        {
            name: 'Caficultor',
            selector: row => row.caficultor,
            sortable: true
        },
        {
            name: 'Municipio',
            selector: row => row.municipio,
            sortable: true
        },
        {
            name: 'Vereda',
            selector: row => row.vereda,
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
            dimension: "3000",
            caficultor: 1,
            municipio: "Huila",
            vereda: "Versalles",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            dimension: "3000",
            caficultor: 1,
            municipio: "Huila",
            vereda: "Versalles",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            dimension: "3000",
            caficultor: 1,
            municipio: "Huila",
            vereda: "Versalles",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">Actualizar</button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            dimension: "3000",
            caficultor: 1,
            municipio: "Huila",
            vereda: "Versalles",
            valor: "30 g",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to='/fincasactualizar'> Actualizar </Link></button> <button  type="button" >Desactivar</button></div> ,
        },
        {
            codigo: 1,
            dimension: "3000",
            caficultor: 1,
            municipio: "Huila",
            vereda: "Versalles",
            valor: "30 g",
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
        <Header title="Fincas" />
        <div className='w-10/12 ml-28'>
            
            <div className='w-96 ml-80 bg-[#E5E5E5] flex justify-center items-center m-8 border-2 rounded-lg border-black'>
                <input className='p-2 bg-[#E5E5E5] text-black rounded-lg w-96' type="text" onChange={handleFilter} placeholder='Buscar' />
                <FaSistrix size={25} />
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/fincasregistrar`}>Registrar</Link>
            </button>
            <DataTable
                columns={colums}
                data={records}
                title="Fincas registradas"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}
