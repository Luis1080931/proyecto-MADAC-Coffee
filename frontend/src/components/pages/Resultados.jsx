import React, { useEffect, useRef, useState } from 'react'
import { Header } from './../molecules/Header.jsx'
import axios from 'axios';
import AccionesModal from '../organisms/ModalAcciones.jsx';
import Ejemplo from '../organisms/Table.jsx';
import ResultadosModal from './../templates/Resultados.jsx';

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
      const response = await axios.get(baseURL, { headers: { token: token } });
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
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES'); // Puedes ajustar el idioma según tu preferencia
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
            uid: "observaciones",
            name: "Observaciones",
            sortable: false 
        },
        { 
            uid: "estado",
            name: "Estado",
            sortable: true 
        },
        { 
            uid: 'actions',
            name: "Acciones",
            sortable: true 
        },
      ];
    


    const handleDesactivar = (idResultado) => {
        
        try {
            axios.put(`http://localhost:3000/resultados/desactivar/${idResultado}`, null, {headers: {token: token}}).then((response) => {
            console.log(response.data)
            if(response.status==200){
                setMensaje('Se desactivó con exito el resultado')
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
    
                await axios.post(baseURL, datosForm).then((response) => {
                    console.log(response)

                    if(response.status == 200){
                        setMensaje('Resultado registrado con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }else{
                        alert('Error de registro')
                    }
                    
                })
             } else if(mode === 'update'){

                    const updateURL = `http://localhost:3000/resultados/actualizar/${id}`

                    axios.put(updateURL, datosForm).then((response) => {
                        console.log(response)
    
                        if(response.status == 200){
                            setMensaje('Se actualizó el resultado con éxito')
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

  return (
    
    <div>
        <Header title="Resultados" />
        <div className='w-full max-w-[90%] ml-28 items-center p-10'>

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
                clickEditar={() => handleToggle('update', id)}
                clickRegistrar={() => handleToggle('create')}
                data={data}
                results={results}
               /*  onUpdate={handleUpdate} */
           />
            
        </div>
    </div>
  )
}