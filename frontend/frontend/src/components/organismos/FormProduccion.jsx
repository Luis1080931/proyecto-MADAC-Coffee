import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormularioProduccion = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    id_producccion: initialData && initialData.id_producccion ? initialData.id_producccion : '', // Añadido id_producccion aquí
    cantidad_produccion: initialData && initialData.cantidad_produccion ? initialData.cantidad_produccion : '',
    precio: initialData && initialData.precio ? initialData.precio : '',
    fk_id_actividad: initialData && initialData.fk_id_actividad ? initialData.fk_id_actividad : ''
  };
  

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false);
  const [nombre_actividad, setNombreActividad] = useState([]);

  useEffect(() => {
    const fetchNombreActividad = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No se encontró el token en el localStorage');
          return;
        }
  
        const response = await axios.get('http://10.193.144.95:3000/listarActividad', {
          headers: {
            'token': token
          }
        });
        setNombreActividad(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchNombreActividad();
  }, []);
  

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarCantidadProduccion = cantidad_produccion => {
    const soloNumeros = /^\d+$/;
    return soloNumeros.test(cantidad_produccion);
  };

  const validarPrecio = precio => {
    const soloNumeros = /^\d+$/;
    return soloNumeros.test(precio);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos del formulario antes de enviar:", formData);
      if (!formData.cantidad_produccion || !formData.precio || !formData.fk_id_actividad) {
        setShowWarning(true);
        return;
      }
      if (!validarCantidadProduccion(formData.cantidad_produccion)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cantidad de producción debe contener solo números'
        });
        return;
      }

      if (!validarPrecio(formData.precio)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El precio debe contener solo números'
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
          'http://10.193.144.95:3000/RegistraProduccion',
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
          text: 'La Producción se ha registrado exitosamente'
        });
        onSubmit(formData);
      } else if (mode === 'update') {
        const { id_producccion } = initialData; // Asegúrate de que aquí también se usa el nombre correcto con 3 'c'
        await axios.put(
          `http://10.193.144.95:3000/ActualizarProduccion/${id_producccion}`,
          formData,
          {
            headers: {
                'token': token
              }
        }
        );
        // Mostrar alerta de actualización exitosa
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La produccion se ha actualizado exitosamente'
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
          Selecciona tu Actividad:
        </label>
        <br />
        <select
          name='fk_id_actividad'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          required={true}
          value={formData.fk_id_actividad}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombre_actividad.map(actividad => (
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
          Precio:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Cantidad Producción:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="number"
          name="cantidad_produccion"
          placeholder="Cantidad Producción"
          value={formData.cantidad_produccion}
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

export default FormularioProduccion;
