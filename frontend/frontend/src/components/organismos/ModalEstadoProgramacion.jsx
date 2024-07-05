import React from 'react';
import { Modal } from 'react-bootstrap';
import FormularioVariedad from './FormProgramacionEstado';

function ModalEstadoProgramacion({ titulo, mostrar, cerrarModal, handleSubmit, initialData }) {
  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mostrar && ( // Asegúrate de que el contenido se renderice solo cuando mostrar es true
          <FormularioVariedad
            onSubmit={handleSubmit}
            className="form-registro"
            initialData={initialData} // Pasa initialData al formulario
            cerrarModal={cerrarModal} // Pasar la función cerrarModal al componente Formulario
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalEstadoProgramacion;
