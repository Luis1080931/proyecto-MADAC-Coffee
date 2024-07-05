import React from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

const ModalOjo = ({ mostrar, cerrarModal, titulo, initialData }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '50%',
      maxHeight: '70%',
      overflowY: 'auto',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      backgroundColor: '#fff',
      outline: 'none',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      fontSize: '40px',
      color: '#888',
      padding: '5px',
      borderRadius: '50%',
      zIndex: 999,
    },
    header: {
      justifyContent: 'center', // Centrar horizontalmente
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    title: {
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: '1.6',
      fontSize: '16px',
      color: '#555',
    },
    fieldRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    field: {
      flex: '0 0 48%',
      backgroundColor: '#E8E8E8',
      padding: '10px',
      borderRadius: '10px',
      fontSize: '19px', // Fuente más grande
      color: '#333',
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
      display: 'block',
      marginBottom: '5px',
    },
  };

  return (
    <Modal
      isOpen={mostrar}
      onRequestClose={cerrarModal}
      contentLabel={titulo}
      ariaHideApp={false}
      style={customStyles}
    >
      <div style={customStyles.header}>
        <h2 style={customStyles.title}>{titulo}</h2>
        <AiOutlineClose
          style={customStyles.closeButton}
          onClick={cerrarModal}
          onMouseEnter={(e) => e.target.style.color = '#000'}
          onMouseLeave={(e) => e.target.style.color = '#888'}
        />
      </div>
  
      <div style={customStyles.contentContainer}>
        <div style={customStyles.fieldRow}>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Finca:</span> {initialData?.nombre_finca}
          </div>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Lote:</span> {initialData?.nombre}
          </div>
        </div>
        <div style={customStyles.fieldRow}>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Tipo de Recurso:</span> {initialData?.nombre_recursos}
          </div>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Variedad de cultivo:</span> {initialData?.nombre_variedad}
          </div>
        </div>
        <div style={customStyles.fieldRow}>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Actividad:</span> {initialData?.nombre_actividad}
          </div>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Tiempo:</span> {initialData?.tiempo}
          </div>
        </div>
        <div style={customStyles.fieldRow}>
          <div style={customStyles.field}>
            <span style={customStyles.label}>A realizar:</span> {initialData?.observaciones}
          </div>
          <div style={customStyles.field}>
            <span style={customStyles.label}>Valor de la Actividad:</span> {initialData?.valor_actividad}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOjo;
