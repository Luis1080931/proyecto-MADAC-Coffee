import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import NavItem from '../../moleculas/Sidebar/NavItem';
import Swal from 'sweetalert2';
import './Navbar.css';
import v from '../../../styles/variables';

function NavbarHeader() {
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recuperar datos del usuario desde localStorage
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setUsuario(usuarioData);
    } else {
      console.error('No se encontraron datos del usuario en localStorage');
    }
  }, []);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Eliminar el token del localStorage
        localStorage.removeItem("usuario"); // Eliminar los datos del usuario del localStorage
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Su sesión ha sido cerrada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.href = '/'; // Redirigir a la página de inicio de sesión
        });
      }
    });
  };

  return (
    <>
      <nav className="navbar bg-#00800 fixed-top p-1">
        <div className="d-flex container align-items-center">
          <button className="btn shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span><FaBars style={{ width: "40px", height: "40px", borderColor: '#009100' }} /></span>
          </button>
          <h1>AGRO-REGISTER</h1>
          <div className="d-flex align-items-center">
            {/*  <img className='imagenpersonal' src={v.Imagepersona} alt="Imagen 2" style={{ width: '100px', objectFit: 'cover', height: '100%' }} onClick={handleModalOpen} /> */}
            {usuario && (
              <div style={{ marginLeft: '10px', fontSize: '20px', marginRight: '50px', cursor: 'pointer' }} onClick={handleModalOpen}>
                <strong style={{ marginLeft:'120px' }}>{usuario.nombre}</strong>
                <div style={{ marginLeft:'120px' }}>{usuario.rol}</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Modal dialogClassName="modal-sm" show={showModal} onHide={handleModalClose} backdrop={false} style={{ marginLeft: '28%', marginTop: '70px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>Visita tu perfil:</p>
          </div>
          <NavItem icon={v.iconoPerfilUsuario} text="Perfil" href="/Perfilprincipal" className="perfil" />

          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>¿Deseas cerrar sesión?</p>
            <button onClick={handleLogout} className='cerrarSesion' style={{ marginLeft: '15px', borderRadius: '10px', backgroundColor: '#E83636', border: 'none', color: 'white', fontSize: '16px', height: '38px' }}>Cerrar sesión</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarHeader;
