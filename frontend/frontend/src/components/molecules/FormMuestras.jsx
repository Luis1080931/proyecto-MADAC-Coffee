import React, { useContext, useEffect, useState } from 'react';
import { ModalFooter, Button, Input } from '@nextui-org/react';
import axiosClient from '../axiosClient';
import MuestrasContext from '../../context/MuestrasContext';

const FormMuestras = ({ actionLabel, handleSubmit, mode, onClose}) => {
  const [fecha, setFecha] = useState('');
  const [tipoMolienda, setTipoMolienda] = useState('');
  const [densidadCafe, setDensidadCafe] = useState('');
  const [proceso, setProceso] = useState('');
  const [tipoTostion, setTipoTostion] = useState('');
  const [altura, setAltura] = useState('');
  const [tiempoFermento, setTiempoFermento] = useState('');
  const [actividadAgua, setActividadAgua] = useState('');
  const [tiempoSecado, setTiempoSecado] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [loteFk, setLoteFk] = useState('');
  const { idMuestras } = useContext(MuestrasContext);
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    axiosClient.get('/lotes/activos')
      .then((response) => {
        console.log('Lotes recibidos:', response.data); // Ver los lotes recibidos
        setLotes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los lotes:', error);
      });
  }, []);

  useEffect(() => {
    if (mode === 'update' && idMuestras) {
        const fechaParts = idMuestras.fecha.split('/');
        const formattedFecha = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]).toISOString().slice(0, 10);
        setFecha(formattedFecha);
        setTipoMolienda(idMuestras.tipo_molienda);
        setDensidadCafe(idMuestras.densidad_cafe);
        setProceso(idMuestras.proceso_fermentacion);
        setTipoTostion(idMuestras.tipo_tostion);
        setAltura(idMuestras.altura_MSNM);
        setTiempoFermento(idMuestras.tiempo_fermentacion);
        setActividadAgua(idMuestras.actividad_agua);
        setTiempoSecado(idMuestras.tiempo_secado);
        setPresentacion(idMuestras.presentacion);
        setLoteFk(idMuestras.fk_lote);
        console.log('Datos de idMuestras recibidos:', idMuestras); // Ver los datos de idMuestras recibidos
    }
  }, [mode, idMuestras]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const fechaValue = new Date(fecha).toISOString().slice(0, 10);
      const datosForm = {
        fecha: fechaValue,
        tipo_molienda: tipoMolienda,
        densidad_cafe: densidadCafe,
        proceso_fermentacion: proceso,
        tipo_tostion: tipoTostion,
        altura_MSNM: altura,
        tiempo_fermentacion: tiempoFermento,
        actividad_agua: actividadAgua,
        tiempo_secado: tiempoSecado,
        presentacion: presentacion,
        fk_lote: parseInt(loteFk),
      };
      console.log('Datos del formulario enviados:', datosForm); // Ver los datos enviados
      handleSubmit(datosForm, e);
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor' + error);
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex flex-row">
          <div className="flex flex-col mr-2 w-[190px]">
            <div className="flex w-[190px] flex-wrap md:flex-nowrap mb-4">
              <Input
                id="fecha"
                type="date"
                name="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required={true}
                placeholder="Ingresa la fecha"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="tipoMolienda"
                name="tipoMolienda"
                type="decimal"
                value={tipoMolienda}
                onChange={(e) => setTipoMolienda(e.target.value)}
                required={true}
                placeholder="Tipo molienda"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="densidadCafe"
                type="text"
                name="densidadCafe"
                value={densidadCafe}
                onChange={(e) => setDensidadCafe(e.target.value)}
                required={true}
                placeholder="Densidad café"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="proceso_fermentacion"
                type="text"
                name="proceso_fermentacion"
                required={true}
                value={proceso}
                onChange={(e) => setProceso(e.target.value)}
                placeholder="Proceso fermentación"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="tipoTostion_cafe"
                type="text"
                name="tipoTostion_cafe"
                required={true}
                value={tipoTostion}
                onChange={(e) => setTipoTostion(e.target.value)}
                placeholder="Tostión del café"
              />
            </div>
          </div>
          <div className="flex flex-col ml-2 w-[190px]">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="altura_MSNM"
                type="decimal"
                name="altura_MSNM"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                required={true}
                placeholder="Altura MSNM"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="tipo_tiempoFermento"
                type="text"
                name ="tipo_tiempoFermento"
                value={tiempoFermento}
                onChange={(e) => setTiempoFermento(e.target.value)}
                required={true}
                placeholder="Tiempo de Fermento"
              />
            </div>
            <div className="flex flex-wrap md:flex-nowrap mb-4 w-full">
              <Input
                id="actividadAgua"
                name="actividadAgua"
                value={actividadAgua}
                onChange={(e) => setActividadAgua(e.target.value)}
                required={true}
                placeholder="Actividad del agua"
                rows="3"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="tiempo_secado"
                type="text"
                name="tipempo_secado"
                value={tiempoSecado}
                onChange={(e) => setTiempoSecado(e.target.value)}
                required={true}
                placeholder="Tiempo de secado"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
              <Input
                id="presentacion"
                type="text"
                name="presentacion"
                value={presentacion}
                onChange={(e) => setPresentacion(e.target.value)}
                required={true}
                placeholder="Presentacion"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
            <select
              className="w-[400px] rounded-xl bg-gray-100 h-[40px]"
              label="Seleccione el lote"
              value={loteFk}
              onChange={(e) => setLoteFk(e.target.value)}
              required={true}
            >
              <option value="" hidden>
                Seleccione el lote...
              </option>
              {lotes.map((lote) => (
                <option key={lote.codigo} value={lote.codigo}>
                  {lote.codigo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button type="submit" color="primary">
            {actionLabel}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default FormMuestras;
