import React from 'react'
import FormVariables from '../molecules/FormVariables.jsx'
import { ModalAcciones } from '../organisms/Modal.jsx'

function VariablesModal ({open, onClose, handleSubmit, actionLabel, title, initialData, mode }){
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose}>
        <FormVariables handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} initialdata={initialData} mode={mode}/>
      </ModalAcciones>
    </>
  )
}

export default VariablesModal