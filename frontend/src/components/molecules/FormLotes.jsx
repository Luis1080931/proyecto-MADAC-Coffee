import React, { useState } from 'react';
import { HeaderRegis } from '../molecules/HeaderRegis.jsx';
import LogoSena from '../../assets/Logosimbolo-SENA-PRINCIPAL.png';
import LogoProyecto from '../../assets/logoProyeccto-removebg.png';
import axios from 'axios';

const baseURL = "http://localhost:3000/lotes/registrar";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTE1NzE2OTcsImV4cCI6MTcxMTY1ODA5N30.vd35eg8d6tpVcWeGbrly5DwGZOrt4i90tV852YiwLYE"; // Tu token completo

export const FormLotes = () => {
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
        <div>
            <HeaderRegis title='Registrar Lotes' />
            <div className='flex'>
                <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
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
                        <div className='flex flex-col m-5 justify-center items-center'>
                            <button className='bg-[#39A900] w-32 p-2 rounded-lg text-white font-bold text-xl' type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
                <div className='w-5/12 flex justify-center items-center ml-20'>
                    <img src={LogoProyecto} alt="" />
                </div>
            </div>
            <div className='w-32 flex justify-end items-end ml-auto h-12'>
                <img src={LogoSena} alt="" />
            </div>
        </div>
    );
};
