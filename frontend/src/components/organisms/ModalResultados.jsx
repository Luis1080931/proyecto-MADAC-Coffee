import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input, Button, ModalContent, ModalHeader } from '@nextui-org/react';
import axios from 'axios';

const VariableInputModal = () => {
  const [variables, setVariables] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [variablesBase, setVariablesBase] = useState([]);
  const token = localStorage.getItem('token');

  const handleChange = (e, index) => {
    const newVariables = [...variables];
    newVariables[index] = e.target.value;
    setVariables(newVariables);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/variables/listarVariable', {headers: {token: token}})
      .then((response) => {
        console.log(response.data)
        setVariablesBase(response.data);
        setVariables(Array(response.data.length).fill(''));
      })
      .catch((error) => {
        console.error('Error fetching variables:', error);
      });
  }, []);
  
  const handleSubmit = async () => {
    try {
     
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i]
        const variableBase = variablesBase[currentIndex]
        
        const data = {
          fk_variables: variablesBase[i]?.v_codigo, 
          valor: variable 
        };
  
        await axios.post('http://localhost:3000/resultados/registrar', data, {headers: {token: token}});
  
        console.log(`Variable ${i + 1} registrada correctamente:`, data);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error al enviar variables:', error);
    }
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)}> Abrir </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <ModalHeader> Registro de resultados de los análisis </ModalHeader>
          <ModalBody>
            {currentIndex < variables.length ? (
              <>
                <h2>{`Variable ${currentIndex + 1}:`} {variablesBase[currentIndex]?.nombre} </h2>
                <Input
                  placeholder="Ingrese el valor"
                  required={true}
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
