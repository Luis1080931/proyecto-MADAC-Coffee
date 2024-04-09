import React, { useRef } from 'react';
import { HeaderRegis } from '../molecules/HeaderRegis.jsx';
import LogoSena from '../../assets/Logosimbolo-SENA-PRINCIPAL.png';
import LogoProyecto from '../../assets/logoProyeccto-removebg.png';
import axios from 'axios';

const baseURL = "http://localhost:3000/lotes/registrar";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTI2MzEyODQsImV4cCI6MTcxMjcxNzY4NH0.LmEiQ1EE5YtOI-Km3a_KHO1ib9aSw0BUboBnuZV35xw";

export const FormLotes = () => {
    const numero_arboles = useRef(null);
    const fk_finca = useRef(null);
    const fk_variedad = useRef(null);


    const handle = async (e) => {
        e.preventDefault();
        try {
            const data = {
                numero_arboles:numero_arboles.current.value,
                fk_finca: fk_finca.current.value,
                fk_variedad:fk_variedad.current.value
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
                    <form method="post" onSubmit={handle}>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Numero de arboles: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='numero_arboles' type="number" name='numero_arboles' placeholder='Ingrese el número de árboles' ref={numero_arboles} />
                        </div>
                        <div className='flex flex-col m-5'  >
                            <label className='text-xl font-bold'> Finca: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='fk_finca' type="number" name='fk_finca' placeholder='Ingrese el ID de la finca' ref={fk_finca} />
                        </div>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Variedad: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='fk_variedad' type="number" name='fk_variedad' placeholder='Ingrese la variedad' ref={fk_variedad} />
                        </div>
                        <div className='flex flex-col m-5 justify-center items-center'>
                            <button className='bg-[#39A900] w-32 p-2 rounded-lg text-white font-bold text-xl' type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
           
       
    );
};    