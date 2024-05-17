import React from 'react'
import {FormFincass} from '../molecules/FormFincass.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, mode}){

    return (
      <>
      <ModalAcciones open={open} title={title} onClose={onClose} > 
        <FormFincass mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      </>
    )
} 

export default ResultadosModal