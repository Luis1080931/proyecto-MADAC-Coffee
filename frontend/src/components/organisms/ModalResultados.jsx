import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input, Button, ModalContent, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';

const VariableInputModal = ({ open, onClose }) => {
  const [variables, setVariables] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [variablesBase, setVariablesBase] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAnalysis, setSelectedAnalysis] = useState('');
  const [analisis, setAnalisis] = useState([])
  const token = localStorage.getItem('token');

  const handleChange = (e, index) => {
    const newVariables = [...variables];
    newVariables[index] = e.target.value;
    setVariables(newVariables);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAnalysisChange = (e) => {
    setSelectedAnalysis(e.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/variables/listarVariable', {headers: {token: token}})
      .then((response) => {
        setVariablesBase(response.data);
        setVariables(Array(response.data.length).fill(''));
      })
      .catch((error) => {
        console.error('Error fetching variables:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/analisis/listar', {headers: {token: token}}).then((response) => {
      const analisisFilter = response.data.filter(anali => anali.estado == 'activo')
      setAnalisis(analisisFilter)
    })
  },[])
  
  const handleSubmit = async () => {
    try {
     
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i]
        const variableBase = variablesBase[currentIndex]
        
        const data = {
          fk_analisis: selectedAnalysis,
          fecha: new Date(selectedDate).toISOString(),
          fk_variables: variablesBase[i]?.v_codigo, 
          valor: variable 
        };
  
        await axios.post('http://localhost:3000/resultados/registrar', data, {headers: {token: token}});
  
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error al enviar variables:', error);
    }
  }

  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalContent>
          <ModalHeader> Registro de resultados de los análisis </ModalHeader>
          <ModalBody>
          <Select 
              label="Seleccione el análisis"
              value={selectedAnalysis}
              onChange={handleAnalysisChange}
              required
            >
              {analisis.map(analisi => (
                <SelectItem key={analisi.codigo} value={analisi.codigo} textValue={analisi.codigo}>
                  {analisi.codigo}
                </SelectItem>
              ))}
            </Select>
            <Input 
              type='date'
              placeholder='Ingrese la fecha'
              value={selectedDate}
              onChange={handleDateChange}
            />
            {currentIndex < variables.length ? (
              <>
                <h2>{`Variable ${currentIndex + 1}:`} {variablesBase[currentIndex]?.nombre} </h2>
                <Input
                  placeholder="Ingrese el valor"
                  required={true}
                  value={variables[currentIndex]}
                  onChange={(e) => handleChange(e, currentIndex)}
                />
                <Button color='primary' onClick={handleNext}>Next</Button>
              </>
            ) : (
              <>
                <h2>Registro completo</h2>
                <Button color='primary' onClick={handleSubmit}>Registrar</Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VariableInputModal;
