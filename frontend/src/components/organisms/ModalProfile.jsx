import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './../atoms/IconEmail.jsx';
import {LockIcon} from './../atoms/LockIcon.jsx';

export default function ProfileModal({ isOpen, onClose }) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Perfil del usuario</ModalHeader>
              <ModalBody>
                <Input 
                  autoFocus
                  label='Identificacion'
                  placeholder="Numero de identificacion"
                  variant="bordered"
                />
                <Input 
                    autoFocus
                    label='Nombre del usuario'
                    placeholder='Nombre del usuario'
                    variant='bordered'
                />
                <Input 
                    autoFocus
                    label='Telefono del usuario'
                    placeholder="Numero de telefono"
                    variant='bordered'
                />
                <Input 
                    autoFocus
                    label='Rol del usuario'
                    placeholder="Administrador o Usuario común"
                    variant='bordered'
                />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
