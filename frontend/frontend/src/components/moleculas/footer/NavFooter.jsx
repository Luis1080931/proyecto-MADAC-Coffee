// Footer.jsx

import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import './Navbar.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>Agro-Register</h2>
            <p>Plataforma para registrar cultivos agrícolas.</p>
            <div className="socials">
              <a href="#"><FaFacebookSquare /></a>
              <a href="#"><FaTwitterSquare /></a>
              <a href="#"><FaInstagramSquare /></a>
            </div>
          </div>
          <div className="footer-section links">
            <h2>Enlaces útiles</h2>
            <ul>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contacto</h2>
            <p><i className="fas fa-envelope"></i> info@agroregister.com</p>
            <p><i className="fas fa-phone"></i> +1234567890</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Agro-Register. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
