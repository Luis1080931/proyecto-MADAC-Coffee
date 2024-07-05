import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SearchBar from '../moleculas/SearchBar';
import Footer from '../organismos/Footer/Footer';
import Header2 from "../organismos/Header/Header2.jsx";

function Actividad2() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [observaciones, setObservaciones] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://10.193.144.95:3000/listarActividad';
      const respuesta = await axios.get(baseURL, {
        headers: { 'token': token }
      });
      // Inicializar el estado de observaciones
      const observacionesInicial = respuesta.data.reduce((acc, curr) => {
        acc[curr.id_actividad] = '';
        return acc;
      }, {});
      setObservaciones(observacionesInicial);

      setData(respuesta.data);
      setOriginalData(respuesta.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token en el localStorage');
        return;
      }

      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://10.193.144.95:3000/Buscaractividad/${searchTerm}`, {
          headers: { 'token': token }
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

  const handleEstadoSeleccionado = (event) => {
    setEstadoSeleccionado(event.target.value);
    if (event.target.value === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(item => item.estado === event.target.value);
      setData(filteredData);
    }
  };

  const handleObservacionesChange = (event, actividadId, estado) => {
    const { value } = event.target;
    // Si la actividad está terminada, inactiva o activa, no permitir cambios en las observaciones
    if (estado === 'terminado' || estado === 'inactivo' || estado === 'activo') {
      return; // No hacer nada
    }
    // Actualizar el estado de las observaciones para la actividad correspondiente
    setObservaciones(prevObservaciones => ({
      ...prevObservaciones,
      [actividadId]: value
    }));
  };

  const handleEnviarObservaciones = (actividadId, estado) => {
    console.log('Estado de la actividad:', estado); // Agregamos esta línea para depurar
    if (estado === 'inactivo') {
      // Mostrar mensaje de error o alerta
      alert('No puedes enviar observaciones porque la actividad está inactiva.');
    } else if (estado === 'terminado') {
      // Mostrar mensaje de actividad terminada
      alert('Esta actividad ya ha sido terminada.');
    } else if (estado === 'activo') {
      // Mostrar mensaje de actividad activa
      alert('Esta actividad debe estar ejecutándose para enviar observaciones.');
    } else {
      // Aquí puedes enviar las observaciones al servidor o realizar cualquier acción necesaria
      console.log('Observaciones de actividad', actividadId, ':', observaciones[actividadId]);
    }
  };

  return (
    <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop: "90px" }}>
      <Header2 />
      <div className="main-content" style={{ flex: 1 }}>
        <div className="container mt-5">
          <SearchBar onSearch={handleSearch} />
          <select
            className="form-select mb-3"
            value={estadoSeleccionado}
            onChange={handleEstadoSeleccionado}
            style={{ fontWeight: '600', width: '180px', backgroundColor: '#E4E4E4', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', cursor: 'pointer' }}
          >
            <option value="">Estados</option>
            <option value="activo">Activo</option>
            <option value="ejecutandose">Ejecutandose</option>
            <option value="inactivo">Inactivo</option>
            <option value="terminado">Terminado</option>
          </select>

          {error ? (
            <p className="text-danger text-center">{error}</p>
          ) : (
            <div className="row">
              {data.map((actividad) => (
                <div key={actividad.id_actividad} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                    <div className="card-body" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                      <h4 style={{ textAlign: 'center' }}>Actividad a realizar: </h4>
                      <br />
                      <p className="card-text"><strong>Actividad:</strong> {actividad.nombre_actividad}</p>
                      <p className="card-text"><strong>Finca:</strong> {actividad.nombre_finca}</p>
                      <p className="card-text"><strong>Lote:</strong> {actividad.nombre}</p> 
                      <p className="card-text"><strong>Tipo recurso:</strong> {actividad.nombre_recursos}</p>
                      <p className="card-text"><strong>Variedad:</strong> {actividad.nombre_variedad}</p>
                      <p className="card-text"><strong>Tiempo:</strong> {actividad.tiempo}</p>
                      <p className="card-text"><strong>A realizar:</strong> {actividad.observaciones}</p>
                      <p className="card-text"><strong>Valor:</strong> {actividad.valor_actividad}</p>
                      <p className="card-text">
                        <strong>Estado:</strong>
                        <span className={`badge ${actividad.estado === 'activo' ? 'bg-success' :
                          actividad.estado === 'ejecutandose' ? 'bg-warning text-dark' :
                          actividad.estado === 'terminado' ? 'bg-danger' :
                          actividad.estado === 'inactivo' ? 'bg-secondary' :
                            'bg-danger'}`}> {actividad.estado}
                      </span>
                    </p>
                    <div>
                      <br />

                       <p style={{fontWeight: 'bold'}}>Observaciones:</p>
                      <textarea
                        rows="4"
                        className="form-control bold"
                        value={observaciones[actividad.id_actividad]}
                        onChange={(event) => handleObservacionesChange(event, actividad.id_actividad, actividad.estado)}
                        placeholder="Escribe tus observaciones aquí"
                        disabled={actividad.estado === 'inactivo' || actividad.estado === 'terminado' || actividad.estado === 'activo'} // Deshabilitar si la actividad está inactiva, terminada o activa
                      />
                      {actividad.estado !== 'inactivo' ? (
                        actividad.estado !== 'terminado' && actividad.estado !== 'activo' ? (
                          <Button
                            variant="success"
                            onClick={() => handleEnviarObservaciones(actividad.id_actividad, actividad.estado)}
                            style={{ marginLeft: '150px',marginTop: '10px' }}
                          >
                            Enviar
                          </Button>
                        ) : (
                          actividad.estado === 'terminado' ? (
                            <p>Esta actividad ya ha sido terminada.</p>
                          ) : (
                            <p>Esta actividad debe estar ejecutándose para enviar observaciones.</p>
                          )
                        )
                      ) : (
                        <p>No puedes enviar observaciones porque la actividad está inactiva.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
    </div>
    {/* <Footer /> */}
  </div>
);
}

export default Actividad2;

