import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import { Buscador } from './../atoms/Buscador.jsx'
/* import { FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom'; */
import VariablesModal from '../templates/VariablesModal.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';

export function Variables () {

    const [mode, setMode] = useState('actualizar');
    

    const handleMode = (mode) => {
        setMode(mode)
        setModalOpen(true)
    }
    const colums = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'fk Tipo analisis',
            selector: row => row.fk_tipo_analisis,
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
            nombre:"alejo Pasaje",
            fk_tipo_analisis: 1,
            estado: "activo", 
            acciones: <ButtonActualizar click={() => handleMode('actualizar')}/>
        }
/*         {
            codigo: 2,
            nombre:"jose Mogoñon",
            fk_tipo_analisis: 2,
            estado: "activo", 
            acciones: <div><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button"><Link to={`/variablesactualizar`}>Actualizar</Link></button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></div> 
        } */

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
        <Header title="Variables" />

        <div className='w-full flex flex-col justify-center items-center p-10'>

        <Buscador handler={handleFilter} />
{/*         <div className='w-10/12 ml-28'>
            <div className='flex justify-center items-center text-center'>
                <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                    <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                    <FaSistrix size={25} style={{ marginRight: 10 }}/>
                </div>
            </div>
            <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
                <Link to={`/variablesregistrar`}>Registrar</Link>
                
            </button> */}
            <ButtonRegister click={() => handleMode('registro')}/>
            <VariablesModal open={modalOpen} onclose={() => setModalOpen(false)} mode={mode}/>

            <DataTable
                columns={colums}
                data={records}
                title="Variables registradas"
                fixedHeader
                pagination
                paginationComponentOptions={paginaOpciones}
            >

            </DataTable>
        </div>
    </div>
  )
}
