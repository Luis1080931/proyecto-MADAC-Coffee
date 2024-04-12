import React from 'react'
import { FormFincass } from '../molecules/FormFincass.jsx'
import { ModalAcciones } from '../organisms/Modal.jsx'
import { Logo } from '../atoms/LogoProyecto.jsx'

function FincasModal({ open, onClose, handleSubmit, actionLabel,initialData,mode}){
  return (
    <ModalAcciones open={open}  onClose={onClose}>
        <FormFincass handleSubmit={handleSubmit} actionLabel={actionLabel} initialData={initialData} mode={mode}/>        
        <Logo />
    </ModalAcciones>
  )
}

export default FincasModal

