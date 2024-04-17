import React from 'react'
import { FormLotes } from '../molecules/FormLotes.jsx'
import { ModalAcciones } from '../organisms/Modal.jsx'

function LotesModal({ open, onClose, handleSubmit, actionLabel, initialData,mode}){
  return (
    <ModalAcciones open={open}  onClose={onClose}>
        <FormLotes handleSubmit={handleSubmit} actionLabel={actionLabel} initialData={initialData} mode={mode} />        
        <Logo />
    </ModalAcciones>
  )
}
export default LotesModal