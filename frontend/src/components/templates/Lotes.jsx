import React from 'react'
import { FormLotes } from '../molecules/FormLotes.jsx'
import { Modal } from '../organisms/Modal.jsx'
import { Logo } from '../atoms/LogoProyecto.jsx'

function LotesModal({ open, onClose, handleSubmit, actionLabel, initialData,mode}){
  return (
    <Modal open={open}  onClose={onClose}>
        <FormLotes handleSubmit={handleSubmit} actionLabel={actionLabel} initialData={initialData} mode={mode} />        
        <Logo />
    </Modal>
  )
}

export default LotesModal