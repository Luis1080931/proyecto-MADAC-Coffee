import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



const FormularioProgramacion = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const [formData, setFormData] = useState({
    fecha_inicio: initialData?.fecha_inicio || '',
    fecha_fin: initialData?.fecha_fin || '',
    fk_id_usuario: initialData?.fk_id_usuario || '',
    fk_id_actividad: initialData?.fk_id_actividad || '',
    fk_id_variedad: initialData?.fk_id_variedad || '',
    id: initialData?.id_programacion || '' // Asegurarse de incluir el id
  });

  useEffect(() => {
    setFormData({
      fecha_inicio: initialData?.fecha_inicio || '',
      fecha_fin: initialData?.fecha_fin || '',
      fk_id_usuario: initialData?.fk_id_usuario || '',
      fk_id_actividad: initialData?.fk_id_actividad || '',
      fk_id_variedad: initialData?.fk_id_variedad || '',
      id: initialData?.id_programacion || '' // Asegurarse de incluir el id
    });
  }, [initialData]);

  const [showWarning, setShowWarning] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState([]);
  const [nombreActividad, setNombreActividad] = useState([]);
  const [nombreVariedad, setNombreVariedad] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No se encontró el token en el localStorage');
                return;
            }

            const usuarioResponse = await axios.get('http://10.193.144.95:3000/listarEmpleado', {
                headers: {
                    'token': token
                }
            });
            setNombreUsuario(usuarioResponse.data);

            const actividadResponse = await axios.get('http://10.193.144.95:3000/listarActividad', {
                headers: {
                    'token': token
                }
            });
            setNombreActividad(actividadResponse.data);

            const variedadResponse = await axios.get('http://10.193.144.95:3000/listarVariedades', {
                headers: {
                    'token': token
                }
            });
            setNombreVariedad(variedadResponse.data);

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    fetchData();
}, []);


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.fecha_inicio || !formData.fecha_fin || !formData.fk_id_usuario || !formData.fk_id_actividad || !formData.fk_id_variedad) {
        setShowWarning(true);
        return;
      }
  
      const fechaInicio = formData.fecha_inicio;
      if (!fechaInicio || !Date.parse(fechaInicio)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de inicio debe estar en formato ISO 8601 (YYYY-MM-DD)'
        });
        return;
      }
  
      const fechaFin = formData.fecha_fin;
      if (!fechaFin || !Date.parse(fechaFin)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha fin debe estar en formato ISO 8601 (YYYY-MM-DD)'
        });
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
          // Manejar el caso en que el token no esté presente  
          console.error('No se encontró el token en el localStorage');
          return;
      }
      if (mode === 'registro') {
        const response = await axios.post(
          'http://10.193.144.95:3000/registrarProgramacion',
          formData,
          {
            headers: {
              'token': token
            }
          }
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La programación se ha registrado exitosamente'
        });
        console.log(response.data);
        onSubmit(formData);
      } else if (mode === 'update') {
        const { id_programacion } = initialData; // Utiliza el campo correcto del ID
        await axios.put(
          `http://10.193.144.95:3000/actualizarProgramacion/${id_programacion}`,
          formData,
          {
            headers: {
                'token': token
              }
        }
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La programación se ha actualizado exitosamente'
        });
      }
  
      onSubmit(formData);
      cerrarModal();
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };
  

  return (
    <form
      className={className}
      onSubmit={handleFormSubmit}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
            <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Usuario:
        </label>
        <br />
        <select
          label='Nombre de Usuario'
          name='fk_id_usuario'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_usuario}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombreUsuario.map(usuarios => (
            <option key={usuarios.id_usuario} value={usuarios.id_usuario}>
              {usuarios.nombre}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor selecciona tu Usuario
        </p>
      )}
            <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Actividad:
        </label>
        <br />
        <select
          label='Nombre de la Actividad'
          name='fk_id_actividad'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_actividad}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombreActividad.map(actividad => (
            <option key={actividad.id_actividad} value={actividad.id_actividad}>
              {actividad.nombre_actividad}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione una Actividad
        </p>
      )}
          <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Variedad:
        </label>
        <br />
        <select
          label='Nombre de la Variedad'
          name='fk_id_variedad'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_variedad}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombreVariedad.map(variedad => (
            <option key={variedad.id_variedad} value={variedad.id_variedad}>
              {variedad.nombre_variedad}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione el nombre de la Variedad
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Fecha de inicio:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Fecha Fin:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
        />
      </div>


  
      <button
        className="boton"
        type="submit"
        style={{
          backgroundColor: 'green',
          borderRadius: '10px',
          color: 'white',
          border: 'none',
          marginLeft: '3%',
          width: '20%',
          fontSize: '17px',
          marginTop: '20px',
          height: '40px'
        }}
      >
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default FormularioProgramacion;