import React from 'react'
import FormMuestras from '../molecules/FormMuestras.jsx'
import {Modal} from './../organisms/Modal.jsx'
import {Logo} from './../atoms/LogoProyecto.jsx'

const MuestrasModal = ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}) => {
  return (
    <>
      <Modal open={open} onClose={onClose} >
        <FormMuestras handleSubmit={handleSubmit} actionLabel={actionLabel} initialData={initialData} mode= {mode} />
        <Logo title={title}/>
      </Modal>
    </>
  )
}

export default MuestrasModal