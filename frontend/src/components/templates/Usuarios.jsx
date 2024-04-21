import React from 'react'
import FormUsuarios from '../molecules/FormUsuarios.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function UsuariosModal ({ open, onClose, handleSubmit, actionLabel, selectedUser, mode, title}){

  // console.log(selectedUser)

    return (
      <>
        
      <ModalAcciones open={open} title={title} onClose={onClose}> 
      
        <FormUsuarios handleSubmit={handleSubmit} actionLabel={actionLabel} mode={mode} selectedUser={selectedUser} onClose={onClose} />
      </ModalAcciones>
      
      </>
    )
} 

export default UsuariosModal