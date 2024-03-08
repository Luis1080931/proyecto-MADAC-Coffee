import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../components/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export function Usuarios () {

    const colums = [
        {
            name: 'Identificacion',
            selector: row => row.Identificacion,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.Nombre,
            sortable: true
        },
        {
            name: 'Telefono',
            selector: row => row.Telefono,
            sortable: true
        },
        {
            name: 'correo',
            selector: row => row.correo,
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.Rol,
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
            Identificacion: 1,
            Nombre: "Juan",
            Telefono: 1,
            correo: "juan@gmail.com",
            Rol: "Usuario",
            estado: "activo", 
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/Usuariosactualizar`}>Actualizar</Link></button> </> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
            Identificacion: 2,
            Nombre: "Mariana",
            Telefono: 1,
            correo: "mariana@gmail.com",
            Rol: "Catador",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/usuariosactualizar`}>Actualizar</Link></button> </div>,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
            
        },
        {
            Identificacion: 3,
            Nombre: "David",
            Telefono: 1,
            correo: "david@gmail.com",
            Rol: "Catador",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/usuariosactualizar`}>Actualizar</Link></button> </div>,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></>  
        },
        {
            Identificacion: 4,
            Nombre: "Laura",
            Telefono: 1,
            correo: "laura@gmail.com",
            Rol: "Catador",
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/usuariosactualizar`}>Actualizar</Link></button> </div>,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        },
        {
            Identificacion: 5,
            Nombre: "Lucas",
            Telefono: 1,
            correo: "lucas@gmail.com",
            Rol: "Catador",
            estado: "inactivo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/usuariosactualizar`}>Actualizar</Link></button> </div>,
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
            return row.correo.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }
  return (
    
    <div>
        <Header title="Usuarios" />
        <div className='w-10/12 ml-28'>
            <div className='flex justify-center items-center text-center'>
                <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                    <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                    <FaSistrix size={25} style={{ marginRight: 10 }}/>
                </div>
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/usuariosregistrar`}>Registrar</Link>
                
            </button>
            <DataTable
                columns={colums}
                data={records}
                title="Usuarios registrados"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}
