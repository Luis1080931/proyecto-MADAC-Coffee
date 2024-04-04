import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './../atoms/Button.jsx'

const baseURL = "http://localhost:3000/lotes/registrar";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTE1NzE2OTcsImV4cCI6MTcxMTY1ODA5N30.vd35eg8d6tpVcWeGbrly5DwGZOrt4i90tV852YiwLYE"; // Tu token completo

export const FormLotes = ({ handleSubmit, actionLabel }) => {
    const [numeroArboles, setNumeroArboles] = useState('');
    const [idFinca, setIdFinca] = useState('');
    const [variedad, setVariedad] = useState('');
    const [estado, setEstado] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();
        try {
            const data = {
                numero_arboles: numeroArboles,
                id_finca: idFinca,
                variedad: variedad,
                estado: estado
            };
            const response = await axios.post(baseURL, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                alert('LOTE REGISTRADO CON ÉXITO');
            } else {
                alert('NO SE PUDO REGISTRAR EL LOTE');
            }
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    };

    return (
        <>
            <form method="post" onSubmit={handleRegistro}>
                <div className='flex flex-col m-5'>
                    <label className='text-xl font-bold'> Numero de arboles: </label>
                    <input className='p-2 rounded-lg w-80 h-12' type="number" value={numeroArboles} onChange={(e) => setNumeroArboles(e.target.value)} placeholder='Ingrese el número de árboles' />
                </div>
                <div className='flex flex-col m-5'  >
                    <label className='text-xl font-bold'> Finca: </label>
                    <input className='p-2 rounded-lg w-80 h-12' type="number" value={idFinca} onChange={(e) => setIdFinca(e.target.value)} placeholder='Ingrese el ID de la finca' />
                </div>
                <div className='flex flex-col m-5'>
                    <label className='text-xl font-bold'> Variedad: </label>
                    <input className='p-2 rounded-lg w-80 h-12' type="text" value={variedad} onChange={(e) => setVariedad(e.target.value)} placeholder='Ingrese la variedad' />
                </div>
                <div className='flex flex-col m-5'>
                    <label className='text-xl font-bold'> Estado: </label>
                    <select name="estado" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <Button actionLabel={actionLabel} />
            </form>
               
        </>
    );
};
