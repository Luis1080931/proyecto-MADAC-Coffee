import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Header } from '../components/Header.jsx';
import { FaSistrix } from "react-icons/fa6";
import axios from 'axios';
import { UsuariosModal } from './../templates/Usuarios.jsx';
import { ButtonRegister } from '../atoms/ButtonRegister.jsx';

export function Usuarios () {

    const baseURL = 'http://localhost:3000/usuarios/listar';
    const [records, setRecords] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');

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
                <ButtonRegister click={() => setModalOpen(true)} />
                <UsuariosModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleSubmit={handleSubmit}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                />
                <DataTable
                    columns={columns}
                    data={records}
                    title="Usuarios registrados"
                    fixedHeader
                    pagination
                    paginationComponentOptions={paginaOpciones}
                />
            </div>
        </div>
    )
}
