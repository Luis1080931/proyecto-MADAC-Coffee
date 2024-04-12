import React from 'react'
import FormUsuarios from '../molecules/FormUsuarios.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function UsuariosModal ({ open, onClose, handleSubmit, actionLabel, selectedUser}){

  // console.log(selectedUser)

    return (
      <>
        
      <ModalAcciones open={open} onClose={onClose}> 
      
        <FormUsuarios handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo />
      </ModalAcciones>
      
      </>
    )
} 

export default UsuariosModal