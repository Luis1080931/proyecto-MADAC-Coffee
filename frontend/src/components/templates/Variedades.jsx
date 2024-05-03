import React from 'react'
import FormVariedades from '../molecules/FormVariedades.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function VariedadesModal ({ open, onClose, handleSubmit, actionLabel, title, mode, initialData }){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title}> 
        <FormVariedades onClose={onClose} handleSubmit={handleSubmit} actionLabel={actionLabel} mode={mode} initialData={initialData} />
      </ModalAcciones>
      
      </>
    )
} 

export default VariedadesModal