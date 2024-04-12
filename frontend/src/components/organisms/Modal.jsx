import React from 'react'
import { FaX } from 'react-icons/fa6'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { ButtonAcciones } from '../atoms/Button.jsx';

export const ModalAcciones = ({ open, onClose, children, actionLabel, title }) => {
  return (
    <>

      {/* {open && (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='bg-[#E6E6E6] flex overflow-auto max-w-90vw max-h-90vh p-5 rounded-xl  justify-center gap-3 lg:w-1/2 z-50'>
            
            {children}

            <div>
              <FaX className='cursor-pointer' onClick={onClose} />
            </div>
          </div>
        </div>
      )

      } */}

<Modal isOpen={open} onClose={onClose}placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {children}
                
                <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary">
                  {actionLabel}
                </Button>
                
              </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

</>
  )
}
