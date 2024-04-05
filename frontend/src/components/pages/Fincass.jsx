import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from '../molecules/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import FincasModal from '../templates/Fincas.jsx';
import Buscador from '../atoms/Buscador.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import { ButtonActualizar } from '../atoms/ButtonActualizar.jsx';

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
            acciones: <div className="flex flex-col"> <ButtonActualizar click={() => handleToggle('update')} /> <button className='bg-red-500 p-2 rounded-lg text-sm font-bold' type="button">Eliminar</button></div>,
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
            <Header title="Fincas" />
            <div className='w-full flex flex-col justify-center items-center p-10'>
                <Buscador handler={handleFilter} />
                <ButtonRegister click={() => handleToggle('create')} />
                <FincasModal 
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleSubmit={handleSubmit}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />
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