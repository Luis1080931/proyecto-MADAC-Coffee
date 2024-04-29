import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, ModalFooter } from '@nextui-org/react'

const FormVariedades = ({ handleSubmit, actionLabel, mode, initialData, onClose }) => {

  const nombre = useRef(null)

  useEffect(() => {
      if(mode == 'update' && initialData){
        nombre.current.value = initialData.nombre
      }
  }, [mode, initialData])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        nombre: nombre.current.value
      }
      handleSubmit(data, e)
    } catch (error) {
      
    }
  }

  return (
    <>
    
    <form method='post' onSubmit={handleFormSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input 
            name="nombre"
            ref={nombre}
            required={true}
            label="Ingrese nombre de variedad"
          />
        </div>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <Button type='submit' color="primary">
            {actionLabel}
          </Button>
        </ModalFooter>
    </form>
    </>   
  )
}

export default FormVariedades