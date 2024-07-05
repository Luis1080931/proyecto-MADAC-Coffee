import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const FormularioVariedad = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    id_variedad: initialData ? initialData.id_variedad : '',
    nombre_variedad: initialData ? initialData.nombre_variedad : '',
    tipo_cultivo: initialData ? initialData.tipo_cultivo : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  const validarNombreVariedad = nombre => {
    const soloLetras = /^[a-zA-Z\s]*$/;
    return soloLetras.test(nombre);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (!formData.nombre_variedad || !formData.tipo_cultivo) {
        setShowWarning(true); // Mostrar advertencia si algún campo está vacío
        return;
      }
      if (!validarNombreVariedad(formData.nombre_variedad)) {
        // Mostrar alerta si el nombre contiene números
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de la variedad solo puede contener letras'
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
          'http://10.193.144.95:3000/registrarVariedad',
          formData,
          {
            headers: {
                'token': token
              }
        }
        );
        console.log(response.data);
        // Mostrar alerta de registro exitoso
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La variedad se ha registrado exitosamente'
        });
        onSubmit(formData);
      } else if (mode === 'update') {
        const { id_variedad } = initialData;
        await axios.put(
          `http://10.193.144.95:3000/actualizarVariedad/${id_variedad}`,
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
          text: 'La variedad se ha actualizado exitosamente'
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
      {showWarning && ( // Mostrar advertencia si showWarning es true
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor complete todos los campos
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Nombre de la variedad:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="text"
          name="nombre_variedad"
          placeholder="Nombre de la variedad"
          value={formData.nombre_variedad}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Tipo de cultivo:{' '}
        </label>
        <br />
        <select
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          name="tipo_cultivo"
          value={formData.tipo_cultivo}
          onChange={handleChange}
        >
          <option value="">Seleccione...</option>
          <option value="alimentarios">alimentarios</option>
          <option value="textiles">textiles</option>
          <option value="oleaginosos">oleaginosos</option>
          <option value="ornamentales">ornamentales</option>
          <option value="industriales">industriales</option>
        </select>
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

export default FormularioVariedad;
