import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Formulario = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    id_tipo_recursos: initialData ? initialData.id_tipo_recursos : '',
    nombre_recursos: initialData ? initialData.nombre_recursos : '',
    cantidad_medida: initialData ? initialData.cantidad_medida : '',
    unidades_medida: initialData ? initialData.unidades_medida : '',
    extras: initialData ? initialData.extras : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (!formData.nombre_recursos || !formData.cantidad_medida || !formData.unidades_medida || !formData.extras) {
        setShowWarning(true);
        return;
      }

      // Validar el nombre de los recursos aquí
      if (!/^[A-Za-z\s,]+$/.test(formData.nombre_recursos)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de los recursos solo puede contener letras, espacios y comas'
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
          'http://10.193.144.95:3000/RegistroRecurso',
          formData,
          {
            headers: {
                'token': token
              }
        }
        );
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El recurso se registró correctamente.'
        });
        onSubmit(formData);
      } else if (mode === 'update') {
        const { id_tipo_recursos } = initialData;
        await axios.put(
          `http://10.193.144.95:3000/actualizarRecurso/${id_tipo_recursos}`,
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
          text: 'El recurso se actualizó correctamente.'
        });
      }

      onSubmit(formData);
      cerrarModal();
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };

  return (
    <form className={className} onSubmit={handleFormSubmit} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor complete todos los campos
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Nombre Recurso: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="nombre_recursos"
          placeholder="Nombre de Recursos"
          value={formData.nombre_recursos}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Cantidad: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="number"
          name="cantidad_medida"
          placeholder="Cantidad"
          value={formData.cantidad_medida}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Unidades Medida: </label>
        <br />
        <select
          style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          name="unidades_medida"
          value={formData.unidades_medida}
          onChange={handleChange}
        >
          <option value="">Seleccione...</option>
          <option value="ml">ml</option>
          <option value="litro">litro</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="unidad">unidad</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Extras: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="extras"
          placeholder="Extras"
          value={formData.extras}
          onChange={handleChange}
        />
      </div>
      <button className="boton" type="submit" style={{ backgroundColor: 'green', borderRadius: '10px', color: 'white', border: 'none', marginLeft: '3%', width: '20%', fontSize: '17px', marginTop: '20px', height: '40px' }}>
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default Formulario;
