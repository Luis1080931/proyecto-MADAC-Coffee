import React from 'react'
import { FaX } from "react-icons/fa6";
import FormUsuarios from '../molecules/FormUsuarios.jsx';
import { Modal } from '../organisms/Modal.jsx';

function UsuariosModal ({ open, onClose, handleSubmit, actionLabel }){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormUsuarios handleSubmit={handleSubmit} actionLabel={actionLabel} />
      </Modal>
      
      </>
    )
} 

export default UsuariosModal