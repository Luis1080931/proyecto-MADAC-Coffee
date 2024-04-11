import React from 'react'
import FormUsuarios from '../molecules/FormUsuarios.jsx';
import { Modal } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function UsuariosModal ({ open, onClose, handleSubmit, actionLabel, selectedUser}){

  // console.log(selectedUser)

    return (
      <>
        
      <Modal open={open} onClose={onClose}> 
      
        <FormUsuarios handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo/>
      </Modal>
      
      </>
    )
} 

export default UsuariosModal