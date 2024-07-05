import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import Botones from '../atomos/BotonRegiApi';
import { Datatable } from '../moleculas/Datatable';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoIssueClosed } from "react-icons/go";
import ModalRecuRegeContrasenia from '../organismos/ModalRecur';
import Header from '../organismos/Header/Header';
import Swal from 'sweetalert2';
import Footer from '../organismos/Footer/Footer'; 
import SearchBar from '../moleculas/SearchBar';
import '../../styles/FondoTable.css';

function Recursos() {


  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://10.193.144.95:3000/listarRecurso';
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
    const updatedInitialData = { ...rowData, id: rowData.id_tipo_recursos };
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
      console.log('Actualización del recurso:', formData);
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }
      const { id_tipo_recursos } = formData;
      const response = await axios.put(`http://10.193.144.95:3000/actualizarRecurso/${id_tipo_recursos}`, formData, {
        headers: {
          'token': token
        }
      });

      if (response.status === 200) {
        console.log('Recurso actualizado exitosamente.');
        fetchData();
        setShowActualizacionModal(false);
      } else {
        console.error('Error al actualizar el recurso:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar el recurso:', error);
    }
  };

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
        const response = await axios.get(`http://10.193.144.95:3000/buscarRecurso/${searchTerm}`, {
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


  const handleEstadoBotonClick = async (id, estado) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }

      const newEstado = estado === 'existe' ? 'agotado' : 'existe';
      const response = await axios.put(`http://10.193.144.95:3000/desactivar/Recurso/${id}`, { estado: newEstado }, {
        headers: {
          'token': token
        }
      });
      if (response.status === 200) {
        console.log('Estado del recurso cambiado exitosamente.');
        fetchData(); // Actualizar la interfaz de usuario con los datos más recientes
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: `El estado se cambió con éxito a ${newEstado}.`,
        });
      } else {
        console.error('Error al cambiar el estado del recurso:', response.data);
      }
    } catch (error) {
      console.error('Error al cambiar el estado de los recursos:', error);
    }
  };


  const handleEstadoSeleccionado = (event) => {
    setEstadoSeleccionado(event.target.value);
    if (event.target.value === '') {
      setData(originalData); // Restaurar los datos originales
    } else {
      const filteredData = originalData.filter(item => item.estado === event.target.value);
      setData(filteredData); // Actualizar la tabla con los datos filtrados
    }
  };

  const columns = [

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
      name: 'Nombre',
      selector: (row) => row.nombre_recursos,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: (row) => row.cantidad_medida,
      sortable: true,
    },
    {
      name: 'Unidades',
      selector: (row) => row.unidades_medida,
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: (row) => row.extras,
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => (
        <span style={{ color: row.estado === 'existe' ? 'green' : '#E83636', fontWeight: '700' }}>
          {row.estado}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (

        <button
          className="btn p-2 rounded-lg estado-button"
          style={{
            backgroundColor: row.estado === 'existe' ? '#E83636' : 'green',
            border: 'none',
            color: 'white',
            height: '40px',
            width: '70%',
            marginLeft: '-16px',
            transition: 'background-color 0.2s',
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_tipo_recursos, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? '#F54949' : '#2DBC28' }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? '#E83636' : 'green' }}
        >
          {row.estado === 'existe' ? <IoIosCloseCircleOutline style={{ marginRight: '1px' }} /> : <GoIssueClosed style={{ marginRight: '3px' }} />}
          {row.estado === 'existe' ? 'Agotado' : 'Disponible'}
        </button>

      ),
    },
  ];

  return (
    <div>
      <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: 1 }}>
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px' }}>

            <SearchBar onSearch={handleSearch} />
            <Botones children="Registrar" onClick={handleOpenRegistroModal} />

            <select
              style={{
                position: 'absolute',
                marginTop: '-36px',
                marginLeft: '940px',
                padding: '8px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)',
                boxShadow: 'rgba(0, 0, 0, 6.1) 0px 0px 8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                width: '100px',
              }}
              value={estadoSeleccionado}
              onChange={handleEstadoSeleccionado}
            >
              <option value="">Estado</option>
              <option value="agotado">Agotado</option>
              <option value="existe">Existe</option>
            </select>
          </div>

          <br />
          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Materiales del cultivo" />
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
      {/* <Footer /> */}
    </div>
  );
}

export default Recursos;