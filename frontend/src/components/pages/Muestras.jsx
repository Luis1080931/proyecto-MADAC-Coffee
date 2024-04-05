import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import Buscador from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import MuestrasModal from '../templates/MuestrasModal.jsx';
import { Axios } from 'axios';

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
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button" onClick={() => handleToggle('update')}>Actualizar</button> <button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> ,
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

  return (
    
    <div>
        <Header title="Muestras" />
        <div className='w-full flex flex-col justify-center items-center p-10'>
            
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            <MuestrasModal 
                open={modalOpen} 
                onClose={()=>setModalOpen(false)} 
                handleSubmit={handleSubmit}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
            />
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
