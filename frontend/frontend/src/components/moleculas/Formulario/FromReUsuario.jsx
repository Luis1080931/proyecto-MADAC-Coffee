import React, { useState } from 'react';
import axios from 'axios';
import InputAtom from '../../atomos/Inputs.jsx';
import Botones from '../../atomos/Botones.jsx';
import HeaderInicio from '../../organismos/Header/HeaderInicio.jsx';
import { Link } from 'react-router-dom';

const FormularioRegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: '',
    estado: ''
  });
  const [loading, setLoading] = useState(false); // Estado para indicar si se está procesando la solicitud


  const [allowSubmit, setAllowSubmit] = useState(true); // Estado para controlar si se permite enviar el formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.193.144.95:3000/registrarUsuario', formData);
      const responseData = JSON.stringify(response.data);
      alert('Registro exitoso:', response.data);
      
      // Limpiar el formulario después de enviar los datos
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: '',
        estado: ''
      });
      window.location.href = "/iniciosesion";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
        const errorMessage = error.response.data.errors[0].msg;
        alert(errorMessage);
      }
      console.log(error);
      // alert('Error al registrar:', error);
      setAllowSubmit(true); // Permitir el envío del formulario nuevamente después de mostrar el mensaje de error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formularioStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '400px',
    textAlign: 'center'
  };

  const tituloStyle = {
    fontSize: '1.3em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1.25rem 0',
  };

  return (
  
    <div className='flex' style={{ margin: '150px', justifyContent: 'center' }}>
      <HeaderInicio />
      <div className='flex items-center justify-center'>
        <h2 style={tituloStyle}>Formulario de Registro</h2>
        <form style={formularioStyle} onSubmit={allowSubmit ? handleSubmit : null} method="post">
          <InputAtom label="Nombre:" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          <InputAtom label="Apellido:" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
          <InputAtom label="Correo:" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
          <InputAtom label="Contraseña:" id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <InputAtom label="Rol:" id="rol" name="rol" value={formData.rol} onChange={handleChange} />
          <InputAtom label="Estado:" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
          
          <Botones type="submit" disabled={!allowSubmit || loading} >Registrarse</Botones>
          <div className='flex items-center justify-center'>
          {loading && <span>Cargando...</span>}
          </div>

          <div className='flex items-center justify-center'><Link to='/iniciosesion'>Ya tienes cuenta</Link></div>
          
        </form>
        
      </div>
    </div>
  );
}

export default FormularioRegistroUsuario;
