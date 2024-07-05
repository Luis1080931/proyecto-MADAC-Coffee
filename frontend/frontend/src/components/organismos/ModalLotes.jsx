import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Formulariolote from '../organismos/FormLotes';


function ModalRecuRegeContrasenia({ titulo, mostrar, cerrarModal, handleSubmit, actionLabel, initialData, mode }) {
  useEffect(() => {
    if (!mostrar) {
      cerrarModal(); // Cierra el modal cuando mostrar cambia a false
    }
  }, [mostrar, cerrarModal]);

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mostrar && ( // Asegura que el contenido se renderice solo cuando mostrar es true
          <Formulariolote
            onSubmit={(data, e) => {
              handleSubmit(data, e);
              cerrarModal(); // Llama a cerrarModal después de enviar el formulario
            }}
            className="form-registro"
            initialData={initialData}
            mode={mode}
            cerrarModal={cerrarModal} // Pasar la función cerrarModal al componente Formulario
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalRecuRegeContrasenia;
