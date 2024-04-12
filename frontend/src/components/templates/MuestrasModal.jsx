import React from 'react'
import FormMuestras from '../molecules/FormMuestras'
import {ModalAcciones} from './../organisms/Modal.jsx'
import {Logo} from './../atoms/LogoProyecto.jsx'

const MuestrasModal = ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}) => {
  return (
    <>
      <ModalAcciones open={open} onClose={onClose} >
        <FormMuestras handleSubmit={handleSubmit} actionLabel={actionLabel} initialData={initialData} mode= {mode} />
        <Logo title={title}/>
      </ModalAcciones>
    </>
  )
}

export default MuestrasModal