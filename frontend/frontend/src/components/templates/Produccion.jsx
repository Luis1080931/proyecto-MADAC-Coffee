
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalProduccion.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';

function Produccion() {


  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://10.193.144.95:3000/listarProduccion';
      const respuesta = await axios.get(baseURL, {
        headers: {
          'token': token
        }
      });
      setData(respuesta.data);
      setOriginalData(respuesta.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = async (newData) => {
    try {
      setShowRegistroModal(false);
      if (newData) {
        // Actualizar tanto data como originalData
        const updatedData = [...data, newData];
        setData(updatedData);
        setOriginalData(updatedData);
        // Recargar la lista de empleados después de registrar uno nuevo
        await fetchData();
      }
    } catch (error) {
      console.error('Error al cerrar el modal de registro:', error);
    }
  };

  const handleOpenActualizacionModal = (rowData) => {
    const updatedInitialData = { ...rowData, id: rowData.id_producccion };
    setInitialData(updatedInitialData);
    setMode('update');
    setShowActualizacionModal(true);
  };


  const handleCloseActualizacionModal = () => {
    setInitialData(null);
    setShowActualizacionModal(false);
  };
  const handleActualizacionFormSubmit = async (formData) => {
    try {
      console.log('Actualización de la producción:', formData);
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }
      const { id_producccion } = formData; // Asegúrate de que aquí también se usa el nombre correcto con 3 'c'
      const response = await axios.put(`http://10.193.144.95:3000/ActualizarProduccion/${id_producccion}`, formData, {
        headers: {
          'token': token
        }
      });
  
      if (response.status === 200) {
        console.log('Producción actualizado exitosamente.');
        fetchData();
        setShowActualizacionModal(false);
      } else {
        console.error('Error al actualizar la producción:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar las producciones:', error);
    }
  };


  // Función para buscar fincas por nombre_actividad
  const handleSearch = async (searchTerm) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }
  
      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://10.193.144.95:3000/BuscarProduccion/${searchTerm}`, {
          headers: {
            'token': token
          }
        });
        setData(response.data);
        if (response.data.length === 0) {
          setError('No se encontraron resultados');
        } else {
          setError(null);
        }
      }
    } catch (error) {
      console.error('Error searching for resources:', error);
      setError('Busqueda no encontrada');
    }
  };



  const columns = [
    /* {
     name: 'ID',
     selector: (row) => row.id_produccion,
     sortable: true,
   },   */
    {
      name: 'Editar',
      cell: (row) => (
        <button
          className="btn p-2 rounded-lg"
          style={{ backgroundColor: '#B5B5B5', borderColor: '#ffc107', marginLeft: '10px', border: 'none' }}
          type="button"
          onClick={() => handleOpenActualizacionModal(row)}
        >
          <FaRegEdit style={{ color: 'black' }} />
        </button>
      ),
    },   
    {
      name: 'Actividad',
      selector: (row) => row.nombre_actividad,
      sortable: true,
    },
    {
      name: 'Precio',
      selector: (row) => row.precio,
      sortable: true,
    },
    {
      name: 'Cantidad Producción',
      selector: (row) => row.cantidad_produccion,
      sortable: true,
    },
    
 
  ];

  return (
    <div>
      <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: 1 }}>
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px', position: 'relative' }}>

            <SearchBar onSearch={handleSearch} />
            <Botones children="Registrar" onClick={handleOpenRegistroModal} />
          </div>

          <br />

          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Producción" />
          )}

        </div>

        <ModalRecuRegeContrasenia
          mostrar={showRegistroModal}
          cerrarModal={handleCloseRegistroModal}
          titulo="Registro"
          actionLabel="Registrar"
          initialData={registroFormData}
          mode="registro"
          handleSubmit={handleCloseRegistroModal}
        />
        <ModalRecuRegeContrasenia
          mostrar={showActualizacionModal}
          cerrarModal={handleCloseActualizacionModal}
          titulo="Actualización"
          handleSubmit={handleActualizacionFormSubmit}
          actionLabel="Actualizar"
          initialData={initialData}
          mode={mode}
        />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Produccion;