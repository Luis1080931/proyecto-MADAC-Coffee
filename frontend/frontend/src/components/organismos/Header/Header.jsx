import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa movilidad
import Sidebar from '../Sidebar/Sidebar';
import NavbarHeader from '../../moleculas/Header/NavbarHeader';
function Header() {
  return (
    <>
      <NavbarHeader/>
      <Sidebar/>
    </>
  );
}

export default Header;
