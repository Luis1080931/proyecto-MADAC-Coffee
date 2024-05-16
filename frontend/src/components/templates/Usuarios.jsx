import React from 'react'
import FormUsuarios from '../molecules/FormUsuarios.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function UsuariosModal ({ open, onClose, handleSubmit, actionLabel, mode, title}){

  // console.log(selectedUser)

    return (
      <>
        
      <ModalAcciones open={open} title={title} onClose={onClose}> 
      
        <FormUsuarios actionLabel={actionLabel} mode={mode} onClose={onClose} handleSubmit={handleSubmit} />
      </ModalAcciones>
      
      </>
    )
} 

export default UsuariosModal