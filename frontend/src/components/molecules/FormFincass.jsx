
import React, { useRef } from 'react';
import { HeaderRegis } from '../molecules/HeaderRegis.jsx';
import LogoSena from '../../assets/Logosimbolo-SENA-PRINCIPAL.png';
import axios from 'axios';
import LogoProyecto from '../../assets/logoProyeccto-removebg.png';

const baseURL = "http://localhost:3000/fincas/registrar";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZGVudGlmaWNhY2lvbiI6MTAyOTg4MDMwNiwibm9tYnJlIjoiU2VyZ2lvIENvcG8iLCJ0ZWxlZm9ubyI6IjMyMjc1ODIzODIiLCJ0aXBvX3VzdWFyaW8iOiJjYWZpY3VsdG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTIyNzg0MDcsImV4cCI6MTcxMjM2NDgwN30.ijkzPDXYnOX_3q14jPu1N80Q8Xd7xQ1QrtP3UfDegVI";

export const FormFincass = () => {
    const dimension_mt2 = useRef(null);
    const fk_caficultor = useRef(null);
    const municipio = useRef(null);
    const vereda = useRef(null);
    const estado = useRef(null);

    const handle = async (e) => {
        e.preventDefault();
        try {
            const data = {
                dimension_mt2: parseInt(dimension_mt2.current.value),
                fk_caficultor: parseInt(fk_caficultor.current.value),
                municipio: parseInt(municipio.current.value),
                vereda: vereda.current.value,
                estado: estado.current.value
            };
            const response = await axios.post(baseURL, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                alert('FINCA REGISTRADA CON ÉXITO');
            } else {
                alert('NO SE PUDO REGISTRAR LA FINCA');
            }
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    };

    return (
        <div>
            <HeaderRegis title='Registrar Fincas' />
            <div className='flex'>
                <div className='bg-[#E6E6E6] flex items-center justify-center p-8 w-4/12 m-16 rounded-lg'>
                    <form method='post' onSubmit={handle}>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Dimensiones de la finca: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='dimension_mt2' name='dimension_mt2' type="number" placeholder='Ingrese las dimensiones de la finca' ref={dimension_mt2} />
                        </div>
                        <div className='flex flex-col m-5'  >
                            <label className='text-xl font-bold'> Caficultor: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='fk_caficultor' type="number" name='fk_caficultor'  placeholder='Ingrese la identificacion del caficultor' ref={fk_caficultor}/>
                        </div>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Municipio: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='municipio' type="number" name='municipio'placeholder='Ingrese el municipio' ref={municipio}/>
                        </div>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Vereda: </label>
                            <input className='p-2 rounded-lg w-80 h-12' id='vereda' type="text" name='vereda' placeholder='Ingrese la vereda' ref={vereda}/>
                        </div>
                        <div className='flex flex-col m-5'>
                            <label className='text-xl font-bold'> Estado: </label>
                            <select name="estado" id="estado" ref={estado}>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
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


