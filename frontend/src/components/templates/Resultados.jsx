import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import { useResultado } from '../../context/ResultadosContext.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){

  const { resultadoSeleccionado } = useResultado();

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title} > 
        <FormResultados initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      </>
    )
} 

export default ResultadosModal