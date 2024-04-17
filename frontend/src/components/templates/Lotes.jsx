import React from 'react'
import { FormLotes } from '../molecules/FormLotes.jsx'
import { ModalAcciones } from '../organisms/Modal.jsx'

function LotesModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){
  return (
    <>
    <ModalAcciones open={open} title={title} > 
      <FormLotes initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
    </ModalAcciones>

    </>
  )
}

export default LotesModal