import React from 'react'
import { FaX } from "react-icons/fa6";
import FormResultados from '../molecules/FormVariedades.jsx';
import { Modal } from '../organisms/Modal.jsx';

function VariedadesModal ({ open, onClose, handleSubmit, actionLabel }){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormResultados handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </Modal>
      
      </>
    )
} 

export default VariedadesModal