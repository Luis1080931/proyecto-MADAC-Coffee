import React from 'react'
import FormMuestras from '../molecules/FormMuestras.jsx'
import { ModalAcciones } from '../organisms/Modal.jsx'


const MuestrasModal = ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}) => {
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose}>
        <FormMuestras handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} initialData={initialData} mode= {mode} />
      </ModalAcciones>
    </>
  )
}

export default MuestrasModal