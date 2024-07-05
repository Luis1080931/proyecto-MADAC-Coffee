import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '../atomos/Iconos';

function DivRecuperarCont({ onClick, title, paragraph, icon, linkText }) {
  return (
    <div className="col-md-10 mb-5" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card p-4 d-flex justify-content-center align-items-center">
        <h2 className="text-2xl font-weight-bold mb-3">{title}</h2>
        <Icon icon={icon} className="fa-2x mb-3 text-center"/>
        <p className="text-lg text-gray-800">{paragraph}</p>
        <p className="text-lg text-gray-800">
          <a href="#" className="text-lg text-success" onClick={onClick}>{linkText}</a>
        </p>
      </div>
    </div>
  );
}

export default DivRecuperarCont;
