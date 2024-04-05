import React from 'react'
import { FormFincass } from '../molecules/FormFincass.jsx'
import { Modal } from '../organisms/Modal.jsx'
import { Logo } from '../atoms/LogoProyecto.jsx'

function FincasModal({ open, onClose, handleSubmit, actionLabel }){
  return (
    <Modal open={open}  onClose={onClose}>
        <FormFincass handleSubmit={handleSubmit} actionLabel={actionLabel} />        
        <Logo />
    </Modal>
  )
}

export default FincasModal