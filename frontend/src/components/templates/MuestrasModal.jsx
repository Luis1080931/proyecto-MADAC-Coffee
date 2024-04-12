import React from 'react'
import FormMuestras from '../molecules/FormMuestras'
import {Modal} from './../organisms/Modal.jsx'
import {Logo} from './../atoms/LogoProyecto.jsx'

const MuestrasModal = ({ open, onClose, handleSubmit, actionLabel, title, initialMode, mode}) => {
  return (
    <>
      <Modal open={open} onClose={onClose} >
        <FormMuestras handleSubmit={handleSubmit} actionLabel={actionLabel} initialMode={initialMode} mode= {mode} />
        <Logo title={title}/>
      </Modal>
    </>
  )
}

export default MuestrasModal