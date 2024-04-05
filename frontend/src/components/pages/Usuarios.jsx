import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Header } from './../molecules/Header.jsx'
import { FaSistrix } from "react-icons/fa6";
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';
import UsuariosModal from '../templates/Usuarios.jsx';

export function Usuarios () {

    const columns = [
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
            acciones: <><button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button" onClick={() => handleToggle('updat e')}>Actualizar</button> </> ,
            accionesDe: <><button className='bg-[#ED6158] p-2 rounded-lg text-sm font-bold' type="button">Desactivar</button></> 
        }
    ]

    const baseURL = 'http://localhost:3000/usuarios/listar';
    const [records, setRecords] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');

    const handleToggle = (mode) => {
        setMode(mode)
        setModalOpen(true)
        if(mode === 'update'){
            
        }
    }

    useEffect(() => {
        try {
            axios.get(baseURL).then((response) => {
                console.log(response)
                setRecords(response.data)
            })
        } catch (error) {
            console.log('Error de servidor' + error)
        }
    }, [])

    function handleFilter(event) {
        const newData = records.filter(row => {
            return row.correo.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const paginaOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (mode === 'create') {
            const baseURL = 'http://localhost:3000/usuarios/registrar'

            axios.post(baseURL).then((response) => {
                console.log("Registrado con exito")
                setModalOpen(false)
            })
        } else if (mode === 'update') {

        }
        setModalOpen(false)
    }

    return (
        <div>
            <Header title="Usuarios" />
            <div className='w-10/12 ml-28'>
                <div className='flex justify-center items-center text-center'>
                    <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                        <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" onChange={handleFilter} placeholder='Buscar' />
                        <FaSistrix size={25} style={{ marginRight: 10 }} />
                    </div>
                </div>
                <ButtonRegister click={() => handleToggle('create')} />
                <UsuariosModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleSubmit={handleSubmit}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />
                <DataTable
                    columns={columns}
                    data={data}
                    title="Usuarios registrados"
                    fixedHeader
                    pagination
                    paginationComponentOptions={paginaOpciones}
                />
            </div>
        </div>
    )
}
