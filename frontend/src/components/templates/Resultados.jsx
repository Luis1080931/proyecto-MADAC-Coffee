import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';


function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, mode, initialData}){

  const {resultadoSeleccionado, seleccionarResultado} = useResultado()


    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title} > 
        <FormResultados initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} seleccionarResultado={seleccionarResultado} />
      </ModalAcciones>
      </>
    )
} 

export default ResultadosModal