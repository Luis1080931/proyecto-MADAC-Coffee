import React from 'react'
import FormUsuarios from '../molecules/FormUsuarios.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function UsuariosModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){

  // console.log(selectedUser)

    return (
      <>
        
      <ModalAcciones open={open} title={title}> 
      
        <FormUsuarios initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      
      </>
    )
} 

export default UsuariosModal