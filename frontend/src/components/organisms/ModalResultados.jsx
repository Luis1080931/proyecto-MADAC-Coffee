import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, ModalHeader, ModalContent, ModalFooter } from '@nextui-org/react';
import {Tabs, Tab} from "@nextui-org/react"; 

// Componente para el modal de registro de resultados
function RegistroResultadosModal({ isOpen, onClose }) {
  const [analisis, setAnalisis] = useState([]);
  const [variables, setVariables] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [valoresVariables, setValoresVariables] = useState({});

  const token = localStorage.getItem('token');

  const cargarVariables = async () => {
    try {
      await axios.get(`http://localhost:3000/variables/listarvariable`, {headers: {token: token}}).then((response) => {
        const variblesFilter = response.data.filter(analisi => analisi.estado == 'activo')
        setVariables(variblesFilter);
      })
    } catch (error) {
      console.error('Error al cargar las variables:', error);
    }
  };

  axios.get('http://localhost:3000/analisis/listar', {headers: {token: token}}).then((response) => {
    const analisisFilter = response.data.filter(analisi => analisi.estado == 'activo')
    setAnalisis(analisisFilter);
  })

  const handleChangeAnalisis = (event) => {
    const { value } = event.target;
    setAnalisisSeleccionado(value);
    cargarVariables(value);
  };

  const handleChangeValorVariable = (event, variableId) => {
    const { value } = event.target;
    setValoresVariables({ ...valoresVariables, [variableId]: value });
  };

  const handleClickSiguiente = () => {
    setPaginaActual(paginaActual + 1);
  };

  const handleClickRegistrar = async () => {
    try {
      await axios.post('http://localhost:3000/resultados/registrar', {
        analisis: analisisSeleccionado,
        valores: valoresVariables
      });
      onClose();
    } catch (error) {
      console.error('Error al registrar los resultados:', error);
    }
  };

  const variants = [
    "solid",
    /* "underlined",
    "bordered",
    "light", */
  ];

  // Obtener las variables de la página actual
  const variablesPagina = variables.slice(paginaActual * 5, (paginaActual + 1) * 5);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
      <ModalHeader>
      <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant} aria-label="Tabs variants">
          <Tab key="photos" title="Photos">
            <form action="#">
            <div className='flex flex-col'>
                <label className='text-xl font-bold'> Fecha: </label>
                <input className='p-2 rounded-lg w-80 h-12' 
                name='fecha' 
                type="date" 
                placeholder='Ingrese la fecha'  
                required={true}
                />
            </div>
              <div className='flex flex-col'>
                <label className='text-xl font-bold'> Codigo del analisis </label>
                <select className='p-2 rounded-lg w-80 h-12'>
                  {analisis.map(anali => (
                    <option value={anali.codigo}>
                      {anali.codigo}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </Tab>
          <Tab key="music" title="Music">
            if()
          </Tab>
          <Tab key="videos" title="Videos"/>
        </Tabs>
      ))}
    </div>
      </ModalHeader>
      {/* <form method='post'>
      <div>
          <label htmlFor="analisis">Seleccionar análisis físico:</label>
          <select id="analisis" value={analisisSeleccionado} onChange={handleChangeAnalisis}>  
                {analisisSeleccionado.map(analisis => (
                    <option key={analisis.codigo} value={analisis.codigo}>
                        {analisis.codigo}
                    </option>
                ))}
          </select>
        </div>
        <div>
          {variablesPagina.map((variable) => (
            <div key={variable.id}>
              <label htmlFor={`variable-${variable.id}`}>{variable.nombre}:</label>
              <input
                type="text"
                id={`variable-${variable.id}`}
                value={valoresVariables[variable.id] || ''}
                onChange={(e) => handleChangeValorVariable(e, variable.id)}
              />
            </div>
          ))}
        </div>
      </form> */}
        
        <div>
          {paginaActual > 0 && <Button onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</Button>}
          {paginaActual < Math.ceil(variables.length / 5) - 1 && (
            <Button onClick={handleClickSiguiente}>Siguiente</Button>
          )}
        </div>
        <ModalFooter>
        <Button onClick={onClose}>Cancelar</Button>
            {paginaActual === Math.ceil(variables.length / 5) - 1 && (
        <Button onClick={handleClickRegistrar}>Registrar</Button>
        )}
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Componente principal que muestra el botón para abrir el modal de registro de resultados
function ModalResultados() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAbrirModal = () => {
    setModalAbierto(true);
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
  };

  return (
    <div>
      <h1>Registro de resultados</h1>
      <button onClick={handleAbrirModal}>Registrar resultados</button>
      <RegistroResultadosModal isOpen={modalAbierto} onClose={handleCloseModal} />
    </div>
  );
}

export default ModalResultados;
