import React from 'react'
import {FormFincass} from '../molecules/FormFincass.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){

    return (
      <>

      <ModalAcciones open={open} title={title} > 
        <FormFincass initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      </>
    )
} 

export default ResultadosModal