import React from 'react'
import FormResultados from '../molecules/FormVariedades.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function VariedadesModal ({ open, onClose, handleSubmit, actionLabel, title, mode, initialData }){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title}> 
        <FormResultados handleSubmit={handleSubmit} actionLabel={actionLabel} mode={mode} initialData={initialData} onClose={onclose} />
      </ModalAcciones>
      
      </>
    )
} 

export default VariedadesModal