import React from 'react'
import NavItem from '../../moleculas/Sidebar/NavItem'
import './Sidebar.css';
import v from '../../../styles/variables';

function Sidebar2() {
  return (
    <div className='justify-content-start'>
      <div className="offcanvas offcanvas-start bgMenu" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <img className='imagenpersonal' src={v.imageLogo} alt="Imagen 2" style={{ width: '100px', objectFit: 'cover', height: '125px' }} />
          <ul className="navbar-nav ">
          <NavItem icon={v.iconoHouse} text="Inicio" href="/dashboard2" />
            <NavItem icon={v.iconoActividad} text="Actividades" href="/actividad2" />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar2