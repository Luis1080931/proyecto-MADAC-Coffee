import React, { useEffect, useRef, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import axios from 'axios';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import Ejemplo from '../organisms/Table.jsx';
import ResultadosModal from './../templates/Resultados.jsx';
import { ResultadoProvider } from '../../context/ResultadosContext.jsx';
import { Modal, ModalBody, Input, Button, ModalContent, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../axiosClient.js';

export function Resultados () {

    const baseURL = 'http://localhost:3000/resultados/listar'
    const token = localStorage.getItem('token')

    const [modalOpen, setModalOpen] = useState(false)
    const [ modalAcciones, setModalAcciones ] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData ] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(baseURL);
      const formattedResults = response.data.map((result) => ({
        ...result,
        fecha: formatDate(result.fecha),
      }));
      setResults(formattedResults);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  };

    const data = [
        { 
            uid: "codigo",
            name: "Código",
            sortable: true 
        },
        { 
            uid: "fecha",
            name: "Fecha",
            sortable: true,
            render: (fecha) => formatDate(fecha)
        },
        { 
            uid: "analisis",
            name: "Análisis", 
            sortable: true 
        },
        { 
            uid: "variable",
            name: "Variable",
            sortable: true 
        },
        { 
            uid: "valor",
            name: "Valor",
            sortable: true 
        },
        { 
            uid: "estado",
            name: "Estado",
            sortable: true 
        },
        { 
            uid: 'actions',
            name: "Acciones",
            sortable: true,
            
        },
      ];
    


    const handleDesactivar = (idResultado) => {
        
        try {
            axiosClient.put(`/resultados/desactivar/${idResultado}`, null, {headers: {token: token}}).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje(response.data.message)
                setModalAcciones(true)
                fetchData()
            }else{
                alert('Error')
            }
            
        })
        } catch (error) {
            alert('Error de servidor' + error)
        }
        
    }

    const handleActivar = (id) => {
        
      try {
          axiosClient.put(`/resultados/activar/${id}`, null, {headers: {token: token}}).then((response) => {
          console.log(response.data)
          if(response.status==200){
              setMensaje(response.data.message)
              setModalAcciones(true)
              fetchData()
          }else{
              alert('Error')
          }
          
      })
      } catch (error) {
          alert('Error de servidor' + error)
      }
      
  }

    const id = localStorage.getItem('idUser')
    

    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm);
        e.preventDefault()
        try {
            if(mode === 'create'){
                const baseURL = 'http://localhost:3000/resultados/registrar'
    
                await axios.post(baseURL, datosForm, {headers: {token: token}}).then((response) => {
                    console.log(response)

                    if(response.status == 200){
                        setMensaje(response.data.message)
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }else{
                        alert('Error de registro')
                    }
                    
                })
             } else if(mode === 'update'){

                    axiosClient.put(`/resultados/actualizar/${id}`, datosForm).then((response) => {
                        console.log(response)
    
                        if(response.status == 200){
                            setMensaje(response.data.message)
                            setModalAcciones(true)
                            setModalOpen(false)
                            fetchData()
                        }else{
                            alert('Error de actualizar')
                        }
                    })
            } 
            setModalOpen(false)
        } catch (error) {
            console.log('Error del servidor' + error)
            alert('Error del servidor' + error)
        }
    }

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }

  
    
        const [variables, setVariables] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [variablesBase, setVariablesBase] = useState([]);
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [selectedAnalysis, setSelectedAnalysis] = useState('');
        const [analisis, setAnalisis] = useState([])
        const [modalRegister, setModalRegister] = useState(false)
        
      
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
          axiosClient.get('/variables/listarVariable')
            .then((response) => {
              console.log(response.data)
              setVariablesBase(response.data);
              setVariables(Array(response.data.length).fill(''));
            })  
            .catch((error) => {
              console.error('Error fetching variables:', error);
            });
        }, []);
      
        useEffect(() => {
          axiosClient.get('/analisis/listar').then((response) => {
            console.log(response.data)
            const analisisFilter = response.data.filter(anali => anali.estado == 'activo')
            setAnalisis(analisisFilter)
          })
        },[])
        
        const handleSubmitRegister = async () => {
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
        
              await axiosClient.post('/resultados/registrar', data).then((response) => {
                console.log(`Variable ${i + 1} registrada correctamente:`, data);
                console.log(response.data)
                if(response.status == 200){
                    setMensaje(response.data.message)
                    setModalAcciones(true)
                    setModalRegister(false)
                    
                    fetchData()
                }
              })
        
              
            }
            setModalRegister(false);
          } catch (error) {
            console.error('Error al enviar variables:', error);
          }
      };

  return (
    <ResultadoProvider>
    <div>
        <Header title="Resultado de los análisis" />
        <div className='w-full max-w-[90%] ml-28 items-center p-10'>

        <Modal isOpen={modalRegister} onClose={() => setModalRegister(false)}>
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
                      <Button color='primary' onClick={handleSubmitRegister}>Registrar</Button>
                    </>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>

        <AccionesModal 
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
        />
        
            <ResultadosModal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                title={mode === 'create' ? 'Registrar resultados' : 'Actualizar resultados'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
            />

           <Ejemplo 
                clickDesactivar={handleDesactivar}
                clickActivar={handleActivar}
                clickRegistrar={() => setModalRegister(true)}
                clickEditar={() => handleToggle('update', id)}
                data={data}
                results={results}
           />
            
        </div>
    </div>
    </ResultadoProvider>
  )
}