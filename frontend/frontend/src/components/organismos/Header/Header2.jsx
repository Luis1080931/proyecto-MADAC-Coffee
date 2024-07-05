import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa movilidad
import Sidebar2 from '../Sidebar/Sidebar2';
import NavbarHeader from '../../moleculas/Header/NavbarHeader';
function Header2() {
  return (
    <>
      <NavbarHeader/>
      <Sidebar2/>
    </>
  );
}

export default Header2;
