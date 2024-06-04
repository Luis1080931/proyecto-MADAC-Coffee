import React, { useContext, useEffect, useState } from 'react';
import FormMuestras from '../molecules/FormMuestras.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import MuestrasContext from '../../context/MuestrasContext.jsx';
import axiosClient from '../axiosClient.js';

const VerMuestras = ({ open, onClose, title, data }) => {
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose}>
        {data.map(datos => (
          <form key={datos.codigo}>
            <div className='flex flex-row'>
              <div className='flex flex-col mr-2 w-[190px]'>
                <div className="flex w-[190px] flex-wrap md:flex-nowrap mb-4">
                  <Input id='fecha' type="date" name="fecha" value={datos.fecha} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='tipoMolienda' name='tipoMolienda' type="decimal" value={datos.tipo_molienda} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='densidadCafe' type="text" name="densidadCafe" value={datos.densidad_cafe} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='proceso_fermentacion' type="text" name="proceso_fermentacion" value={datos.proceso_fermentacion} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='tipoTostion_cafe' type="text" name="tipoTostion_cafe" value={datos.tipo_tostion} readOnly />
                </div>
              </div>
              <div className='flex flex-col ml-2 w-[190px]'>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='altura_MSNM' type="decimal" name="altura_MSNM" value={datos.altura_MSNM} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='tipo_tiempoFermento' type="text" name="tipo_tiempoFermento" value={datos.tiempo_fermentacion} readOnly />
                </div>
                <div className="flex flex-wrap md:flex-nowrap mb-4 w-full">
                  <Input id='actividadAgua' name="actividadAgua" value={datos.actividad_agua} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='tiempo_secado' type="text" name="tiempo_secado" value={datos.tiempo_secado} readOnly />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                  <Input id='presentacion' type="text" name="presentacion" value={datos.presentacion} readOnly />
                </div>
              </div>
            </div>
            <div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-4">
                <Input id='lote' type="text" name="lote" value={datos.fk_lote} readOnly />
              </div>
            </div>
          </form>
        ))}
      </ModalAcciones>
    </>
  );
};

export default VerMuestras