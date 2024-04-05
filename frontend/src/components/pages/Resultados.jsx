import React, { useEffect, useRef, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import { Buscador } from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import ResultadosModal from './../templates/Resultados.jsx';
import axios from 'axios';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';
import { Datatable } from '../organisms/Datatable.jsx';


export function Resultados () {

    const baseURL = 'http://localhost:3000/resultados/listar'
    const token = localStorage.getItem('token')

    const [datos, setData] = useState([])

    useEffect(() => {
        try {
            axios.get(baseURL, {headers: {token:token}}).then((response) => {
                console.log(response)
                setData(response.data)
            })
        } catch (error) {
            console.log('Error de servidor' + error)
        }
    }, [token])

    const columns = [
        {
            name:  'Id',
         /*   selector: 'codigo', */
        sortable: true
        },
        {
            name: 'Fecha',
            /* selector: 'fecha',
        */     sortable: true
        },
        {
            name: 'Análisis',
            /* selector: 'fk_analisis',
  */           sortable: true
        },
        {
            name: 'Variable',
            /* selector: 'fk_variable',
  */           sortable: true
        },
        {
            name: 'Valor',
            /* selector: 'valor',
        */     sortable: true
        },
        {
            name: 'Observaciones',
            /* selector: 'observaciones', */
            sortable: true
        },
        {
            name: 'Estado',
            /* selector: 'estado',
       */      sortable: true
        },
        {
            name: 'Acciones',
            cell: () => <ButtonActualizar click={() => handleToggle('update')} /> 
        }
    ]

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

  return (
    
    <div>
        <Header title="Resultados" />
        <div className='w-full flex flex-col justify-center items-center p-10'>
            
            <Buscador handler={handleFilter} />
            <ButtonRegister click={() => handleToggle('create')} />
            {/* <ButtonActualizar click={() => handleToggle('update')} /> */}
            <ResultadosModal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar resultados' : 'Actualizar resultados'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />

            <Datatable columns={columns} data={datos} title={'Resultados registrados'} />
            
        </div>
    </div>
  )
}


    /* const [records, setRecords] = useState(data) */

/* const colums = [
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
    ] */

