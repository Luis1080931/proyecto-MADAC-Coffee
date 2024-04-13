import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export const ModalAcciones = ({ open, onClose, children, actionLabel, title, handleSubmit }) => {

  const handleSubmitButton = (e) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <>

<Modal isOpen={open} onClose={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmitButton}>

                  {children}

                
                
                <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary" onClick={handleSubmitButton}>
                  {actionLabel}
                </Button>
                
              </ModalFooter>
             </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

</>
  ) 
}
