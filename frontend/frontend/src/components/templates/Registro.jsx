import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Botones from '../atomos/Botones.jsx';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import Footer from '../organismos/Footer/Footer';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logoOrigi.png';
import v from '../../styles/variables';
/* import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png'; */
import InputAtom from '../atomos/Inputs.jsx';
import Select from '../atomos/selectRegistro.jsx';
import axios from 'axios';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: ''
  });

  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Comenzar la carga

    try {
      const response = await axios.post('http://10.193.144.95:3000/registrarUsuario', formData);

      Swal.fire({
        title: 'Registro exitoso',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir a la página de inicio de sesión después de que el usuario haga clic en "OK"
          window.location.href = "/";
        }
      });

      // Limpiar el formulario después de enviar los datos
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: ''
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        Swal.fire('Error al registrar', errorMessage, 'error');
      } else {
        console.log(error);
        Swal.fire('Error al registrar', 'Ocurrió un error inesperado', 'error');
      }
    }

    setLoading(false); // Detener la carga
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
    borderRadius: '15px',
    padding: '40px',
    margin: 'auto',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const fondoStyle = {
    backgroundImage: `url(${v.ImgSlider1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  };

  const imgStyle = {
    display: 'block',
    margin: '0 auto',
    maxWidth: '160px',
  };

  const btnWrapperStyle = {
    textAlign: 'center',
    marginTop: '20px',
    marginLeft: '20px',
  };

  return (
    <div style={fondoStyle}>
      <HeaderInicio />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ flex: 1 }}>
        <div className='flex items-center justify-center'>
          <form style={formularioStyle} onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '2.3em', fontWeight: 'bold', textAlign: 'center', padding: '1.30rem 0', color: 'black' }}>Registro de Usuario</h2>
            <img src={Logo} alt="Logo" style={imgStyle} />
            <div className='flex flex-col space-y-4'>
              <InputAtom label="Nombre:" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
              <InputAtom label="Apellido:" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
              <InputAtom label="Correo:" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
              <InputAtom label="Contraseña:" id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
              <Select label="Rol:" id="rol" name="rol" value={formData.rol} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="administrador">Administrador</option>
              </Select>
              {loading && <span>Cargando..</span>}
            </div>
            <div style={btnWrapperStyle}>
              <Botones type={'submit'} children={'Registrarse'} />
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Registro;
