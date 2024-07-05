import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalRecuRegeContrasenia({ titulo, mostrar, cerrarModal, children }) {
  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default ModalRecuRegeContrasenia;
