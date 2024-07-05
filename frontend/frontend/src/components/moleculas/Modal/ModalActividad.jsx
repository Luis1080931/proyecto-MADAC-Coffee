// ModalActividad.js
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import FormActividad from '../Formulario/FormularioActividad';

function ModalActividad({ titulo, mostrar, cerrarModal, handleSubmit, actionLabel, initialData, mode }) {
  useEffect(() => {
    if (!mostrar) {
      cerrarModal(); // Cierra el modal cuando 'mostrar' cambia a false
    }
  }, [mostrar, cerrarModal]);

  const handleClose = () => {
    cerrarModal();
  };

  return (
    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mostrar && (
          <FormActividad
            onSubmit={(data) => {
              handleSubmit(data);
              cerrarModal(); // Llama a cerrarModal después de enviar el formulario
            }}
            initialData={initialData}
            mode={mode}
            cerrarModal={cerrarModal} 
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalActividad;
