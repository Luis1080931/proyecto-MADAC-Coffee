import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const Formulariofinca = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    id_finca: initialData && initialData.id_finca ? initialData.id_finca : '',
    nombre_finca: initialData && initialData.nombre_finca ? initialData.nombre_finca : '',
    longitud: initialData && initialData.longitud ? initialData.longitud : '',
    latitud: initialData && initialData.latitud ? initialData.latitud : ''
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
  const validarNombreFinca = nombre => {
    const soloLetras = /^[a-zA-Z\s]*$/;
    return soloLetras.test(nombre);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.nombre_finca || !formData.longitud || !formData.latitud) {
        setShowWarning(true); // Mostrar advertencia si algún campo está vacío
        return;
      }
      if (!validarNombreFinca(formData.nombre_finca)) {
        // Mostrar alerta si el nombre contiene números
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de la finca solo puede contener letras'
        });
        return;
      }

      // Validar longitud
      if (isNaN(formData.longitud) || formData.longitud < -180 || formData.longitud > 180) {
        // Mostrar alerta si la longitud no es válida
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La longitud debe ser un número válido entre -180 y 180'
        });
        return;
      }

      // Validar latitud
      if (isNaN(formData.latitud) || formData.latitud < -90 || formData.latitud > 90) {
        // Mostrar alerta si la latitud no es válida
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La latitud debe ser un número válido entre -90 y 90'
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
          'http://10.193.144.95:3000/RegistroFinca',
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
          text: 'La finca se ha registrado exitosamente'
        });
        console.log(response.data);
        onSubmit(formData);
      } else if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://10.193.144.95:3000/actualizarFinca/${id}`,
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
          text: 'La finca se ha actualizado exitosamente'
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
          Nombre de la finca:{' '}
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
          name="nombre_finca"
          placeholder="Nombre de la finca"
          value={formData.nombre_finca}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Longitud:{' '}
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
          name="longitud"
          placeholder="longitud"
          value={formData.longitud}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          latitud:{' '}
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
          name="latitud"
          placeholder="latitud"
          value={formData.latitud}
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

export default Formulariofinca;
