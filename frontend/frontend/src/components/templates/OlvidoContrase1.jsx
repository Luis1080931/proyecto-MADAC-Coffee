import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../organismos/Footer/Footer.jsx';
import axios from 'axios';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import Botones from '../atomos/Botones.jsx';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png'; // Importa la imagen de fondo si no está importada
import Logo from '../../assets/logoOrigi.png'; // Importa la imagen del logo si no está importada
import InputAtom from '../atomos/Inputs.jsx'; // Importa el componente de input

const Olvidopassone = () => {
  const [correo, setCorreo] = useState(''); // Estado para el correo electrónico
  const [loading, setLoading] = useState(false); // Estado para indicar si se está procesando la solicitud

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (correo.trim() === '') {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      setLoading(true); // Indicar que se está cargando
      
      // Lógica para enviar el correo de recuperación de contraseña
      // Puedes agregarla aquí usando Axios u otra librería para realizar solicitudes HTTP

      alert('Se ha enviado un correo de recuperación de contraseña a tu dirección de correo electrónico.');
      
      window.location.href = "/olvidocontra2";
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      alert('Hubo un error al enviar el correo de recuperación. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const formularioStyle = {
    border: '1px solid #ccc',
    borderRadius: '15px',
    padding: '40px',
    margin: '20px auto',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  };

  
  const fondoStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh¿',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  };
  
  const tituloStyle = {
    fontSize: '2.3em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1.30rem',
  };

  const buttonStyle = {
    outline: 'none',
    background: '#1bc12e',
    border:"none"
  };

  return (
    <div style={fondoStyle}>
      <div className='flex' style={{ margin: '130px' }}>
        <HeaderInicio />
        <div className='flex items-center justify-center'>
          <form style={{ textAlign: 'center', ...formularioStyle }} onSubmit={handleSubmit}>
            <label style={tituloStyle}>Recuperación de Contraseña</label>
            <img src={Logo} alt="Logo" style={{ maxWidth: '160px' }} />
            <div style={{ marginTop: '20px' }}>
              <InputAtom
                className={'mb-1 height-10'}
                type="email"
                placeholder="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div style={{ textAlign: 'center'}}>
              {loading && <span>Cargando...</span>}
            </div>
            <div style={{ display: 'flex', margin: '10px', marginTop: '50px', marginLeft:"-50px" }}>
              <Botones children='Enviar' type="submit" disabled={loading} style={buttonStyle} />
            <div style={{ marginLeft: '-90px'}}>
                <Link to='/' style={{textDecoration:"none"}}>
                  <Botones children='cancelar' type="submit" style={buttonStyle} />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Olvidopassone;
