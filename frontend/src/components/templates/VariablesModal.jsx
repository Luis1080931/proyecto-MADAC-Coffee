import React from 'react'
import { Modal } from './../organisms/Modal.jsx'
import { Logo } from './../atoms/LogoProyecto.jsx'
import FormVariables from '../molecules/FormVariables.jsx'

function VariablesModal ({open, onClose, handleSubmit, actionLabel, title, initialData, mode }){
  return (
    <>
      <Modal open={open} onClose={onClose} >
        <FormVariables handleSubmit={handleSubmit} actionLabel={actionLabel} initialdata={initialData} mode={mode}/>
        <Logo title={title}/>
      </Modal>
    </>
  )
}

export default VariablesModal