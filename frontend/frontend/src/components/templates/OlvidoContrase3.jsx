import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Botones from '../atomos/Botones.jsx';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import InputAtom from '../atomos/Inputs.jsx';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png';
import Logo from '../../assets/logoOrigi.png';
import Footer from '../organismos/Footer/Footer.jsx';

const Olvidopasstree = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === '' || confirmPassword.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    alert('Contraseña cambiada exitosamente.');
    window.location.href = "/";
  };

  // Estilo para el contenedor principal
  const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '0px',
    boxSizing: 'border-box',
    position: 'relative',
    marginTop:"180px"
  };

  // Estilo para el formulario
  const formStyle = {
    width: '100%',
    maxWidth: '420px',
    padding: '70px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    border: '1px solid #ccc'
  };

  return (
    <div style={mainContainerStyle}>
      <div style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}></div>
      <HeaderInicio />

      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px', marginLeft:"50px" }}>Cambio de Contraseña</label>
        <img src={Logo} alt="Logo" style={{ maxWidth: '160px', marginBottom: '20px', marginLeft:"62px" }} />
        <InputAtom
          type="password"
          placeholder="Contraseña Nueva"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputAtom
          type="password"
          placeholder="Confirmación de Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div style={{ textAlign: 'center', paddingTop: "20px" }}>
          <Botones type="submit">Enviar</Botones>
        </div>
      </form>
      div
      <Footer />
    </div>
  );
};

export default Olvidopasstree;
