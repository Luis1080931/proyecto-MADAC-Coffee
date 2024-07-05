import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Botones from '../atomos/Botones.jsx';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import InputAtom from '../atomos/Inputs.jsx';
import Logo from '../../assets/logoOrigi.png';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png';
import Footer from '../organismos/Footer/Footer.jsx';

const Olvidopasstwo = () => {
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigo.trim() === '') {
      alert('Por favor, ingresa el código de recuperación.');
      return;
    }

    alert('Código de recuperación enviado correctamente.');
    window.location.href = "/olvidocontra3";
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box'
  };

  const formularioStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  };

  const fondoStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={fondoStyle}></div>
      <HeaderInicio />
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formularioStyle}>
          <label style={{ fontSize: '2.3em', fontWeight: 'bold', marginBottom: '20px' }}>Código de Recuperación</label>
          <img src={Logo} alt="Logo" style={{ maxWidth: '160px', marginBottom: '20px' }} />
          <InputAtom
            type="number"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <div style={{ marginTop: '30px', marginLeft: "50px" }}>
            <Link to='/olvidocontra3' style={{ textDecoration: 'none' }}>
              <Botones>Enviar</Botones>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Olvidopasstwo;
