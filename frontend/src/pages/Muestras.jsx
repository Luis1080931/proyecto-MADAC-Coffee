import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../components/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export function Muestras () {

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
            name: 'Cantidad',
            selector: row => row.cantidad,
            sortable: true
        },
        {
            name: 'Quien Recibe',
            selector: row => row.quienRecibe, 
            sortable: true
        },
        {
            name: 'Proceso de Fermentación',
            selector: row => row.procesoFermentacion, 
            sortable: true
        },
        {
            name: 'Humedad Café',
            selector: row => row.humedadCafe, 
            sortable: true
        },
        {
            name: 'Altura MSNM',
            selector: row => row.alturaMSNM, 
            sortable: true
        },
        {
            name: 'Tipo de Secado',
            selector: row => row.tipoSecado, 
            sortable: true
        },
        {
            name: 'Observaciones',
            selector: row => row.observaciones,
            sortable: true
        },
        {
            name: 'FK Lote',
            selector: row => row.fkLote, 
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
            cantidad: 1,
            quienRecibe: "Marcela Duran",
            procesoFermentacion: "alcoholica",
            humedadCafe: 12.2,
            alturaMSNM: 1.5,
            tipoSecado: "seco",
            observaciones: "presento un buen nivel de humedad",
            fkLote: 1,
            estado: "activo", 
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/muestrasactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
            codigo: 2,
            fecha: "2024-02-29",
            cantidad: 1,
            quienRecibe: "Leonardo Alfonso",
            procesoFermentacion: "alcoholica",
            humedadCafe: 12.2,
            alturaMSNM: 1.5,
            tipoSecado: "seco",
            observaciones: "presento un buen nivel de humedad",
            fkLote: 1,
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/muestrasactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></div> 
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
        <Header title="Muestras" />
        <div className='w-10/12 ml-28'>
            <div className='flex justify-center items-center text-center'>
                <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                    <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                    <FaSistrix size={25} style={{ marginRight: 10 }}/>
                </div>
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/muestrasregistrar`}>Registrar</Link>
                
            </button>
            <DataTable
                columns={colums}
                data={records}
                title="Muestras registradas"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}
