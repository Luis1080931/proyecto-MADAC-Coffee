import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../molecules/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export function Fincas() {

    const columns = [
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
            selector: row => row.acciones,
            wrap: true 
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
            acciones: <div className="flex flex-col"><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold mb-2' type="button">Actualizar</button> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
        },
        {
            codigo: 2,
            dimension: "4000",
            caficultor: 2,
            municipio: "Tolima",
            vereda: "Andes",
            valor: "40 g",
            estado: "activo",
            acciones: <div className="flex flex-col"><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold mb-2' type="button">Actualizar</button> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
        },
        {
            codigo: 3,
            dimension: "5000",
            caficultor: 3,
            municipio: "Caldas",
            vereda: "Pacífico",
            valor: "50 g",
            estado: "inactivo",
            acciones: <div className="flex flex-col"><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold mb-2' type="button">Actualizar</button> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
        },
        {
            codigo: 4,
            dimension: "6000",
            caficultor: 4,
            municipio: "Quindío",
            vereda: "Oriente",
            valor: "60 g",
            estado: "activo",
            acciones: <div className="flex flex-col"><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold mb-2' type="button">Actualizar</button> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
        },
        {
            codigo: 5,
            dimension: "7000",
            caficultor: 5,
            municipio: "Antioquia",
            vereda: "Central",
            valor: "70 g",
            estado: "activo",
            acciones: <div className="flex flex-col"><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold mb-2' type="button">Actualizar</button> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
        }
    ]

    const paginaOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    }

    const [records, setRecords] = useState(data)

    function handleFilter(event) {
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
                    Registrar
                </button>
                <DataTable
                    columns={columns}
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
