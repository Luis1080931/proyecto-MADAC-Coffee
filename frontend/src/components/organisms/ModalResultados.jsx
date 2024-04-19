import React, { useState } from 'react';
import { Modal, ModalBody, Input, Button, ModalContent, ModalHeader } from '@nextui-org/react';

const VariableInputModal = () => {
  const [variables, setVariables] = useState(Array(30).fill('')); // Inicializamos 30 variables con valores vacíos
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e, index) => {
    const newVariables = [...variables];
    newVariables[index] = e.target.value;
    setVariables(newVariables);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    console.log(variables);
    setModalOpen(false);
  };

  return (
    <>    
    <button onClick={() => setModalOpen(true)}> Abrir </button>
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalContent>
        <ModalHeader> Registro de resultados de los analisis </ModalHeader>
      <ModalBody>
        {currentIndex < variables.length ? (
          <>
            <h2>{`Variable ${currentIndex + 1}`}</h2>
            <Input
              placeholder="Ingrese el valor"
              value={variables[currentIndex]}
              onChange={(e) => handleChange(e, currentIndex)}
            />
            <Button onClick={handleNext}>Next</Button>
          </>
        ) : (
          <>
            <h2>Registro completo</h2>
            <Button onClick={handleSubmit}>Registrar</Button>
          </>
        )}
      </ModalBody>
      </ModalContent>
    </Modal>
    </>

  );
};

export default VariableInputModal;


/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, ModalHeader, ModalContent, ModalFooter } from '@nextui-org/react';
import {Tabs, Tab} from "@nextui-org/react"; 

function ModalResultados() {
  const [analisisSeleccionado, setAnalisisSeleccionado] = useState('');
  const [analisis, setAnalisis] = useState([]);
  const [variables, setVariables] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [valoresVariables, setValoresVariables] = useState({});
  const [fecha, setFecha] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarAnalisis();
  }, []);

  useEffect(() => {
    if (analisisSeleccionado) {
      cargarVariables(analisisSeleccionado);
    }
  }, [analisisSeleccionado]);

  const cargarAnalisis = async () => {
    try {
      const response = await axios.get('http://localhost:3000/analisis/listar', {
        headers: { token: token }
      });
      const analisisFilter = response.data.filter(analisi => analisi.estado === 'activo');
      setAnalisis(analisisFilter);
    } catch (error) {
      console.error('Error al cargar los análisis:', error);
    }
  };

  const cargarVariables = async (analisisId) => {
    try {
      const response = await axios.get(`http://localhost:3000/variables/listarvariable?analisis=${analisisId}`, {
        headers: { token: token }
      });
      const variablesFilter = response.data.filter(variable => variable.estado === 'activo');
      setVariables(variablesFilter);

      const initialValues = {};
      variablesFilter.forEach(variable => {
        initialValues[variable._id] = '';
      });
      setValoresVariables(initialValues);
    } catch (error) {
      console.error('Error al cargar las variables:', error);
    }
  };

  const handleChangeAnalisis = (event) => {
    const { value } = event.target;
    setAnalisisSeleccionado(value);
  };

  const handleChangeValorVariable = (event, variableId) => {
    const { value } = event.target;

    setValoresVariables(prevState => ({
      ...prevState,
      [variableId]: value
    }));
  };

  const handleClickSiguiente = () => {
    setPaginaActual(paginaActual + 1);
  };

  const handleClickRegistrar = async () => {
    try {
      await axios.post('http://localhost:3000/resultados/registrar', {
        fecha,
        analisis: analisisSeleccionado,
        valores: valoresVariables
      });
      setModalOpen(false);
    } catch (error) {
      console.error('Error al registrar los resultados:', error);
    }
  };

  const variablesPagina = variables.slice(paginaActual * 5, (paginaActual + 1) * 5);

  return (
    <>
    <button onClick={() => setModalOpen(true)}> Abrir </button>
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Registro de Resultados</ModalHeader>
        <Tabs variant="solid" aria-label="Tabs variants">
          <Tab title="Datos Generales">
            <form>
              <div className='flex flex-col'>
                <label className='text-xl font-bold'> Fecha: </label>
                <input
                  className='p-2 rounded-lg w-80 h-12'
                  name='fecha'
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  placeholder='Ingrese la fecha'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-xl font-bold'> Código del Análisis: </label>
                <select
                  className='p-2 rounded-lg w-80 h-12'
                  value={analisisSeleccionado}
                  onChange={handleChangeAnalisis}
                >
                  <option value="">Seleccione un análisis</option>
                  {analisis.map(analisis => (
                    <option key={analisis._id} value={analisis._id}>
                      {analisis.codigo}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </Tab>
          {variablesPagina.map(variable => (
            <Tab key={variable.v_codigo} title={variable.nombre}>
              <div className='flex flex-col'>
                <label className='text-xl font-bold'> Valor de {variable.nombre}: </label>
                <input
                  className='p-2 rounded-lg w-80 h-12'
                  type="text"
                  placeholder={`Ingrese el valor de ${variable.nombre}`}
                  value={valoresVariables[variable.v_codigo] || ''}
                  onChange={(e) => handleChangeValorVariable(e, variable.v_codigo)}
                />
              </div>
            </Tab>
          ))}
        </Tabs>
        <div>
          {paginaActual > 0 && <Button onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</Button>}
          {paginaActual < Math.ceil(variables.length / 5) - 1 && (
            <Button onClick={handleClickSiguiente}>Siguiente</Button>
          )}
        </div>
        <ModalFooter>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          {paginaActual === Math.ceil(variables.length / 5) - 1 && (
            <Button onClick={handleClickRegistrar}>Registrar</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
    
  );
}

export default ModalResultados;

 */