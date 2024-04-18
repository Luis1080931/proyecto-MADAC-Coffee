import React from 'react'

import { Logo } from './../atoms/LogoProyecto.jsx'
import FormVariables from '../molecules/FormVariables.jsx'
import { ModalAcciones } from '../organisms/Modal.jsx'

function VariablesModal ({open, onClose, handleSubmit, actionLabel, title, initialData, mode }){
  return (
    <>
      <ModalAcciones open={open} onClose={onClose} >
        <FormVariables handleSubmit={handleSubmit} actionLabel={actionLabel} initialdata={initialData} mode={mode}/>
        <Logo title={title}/>
      </ModalAcciones>
    </>
  )
}

export default VariablesModal