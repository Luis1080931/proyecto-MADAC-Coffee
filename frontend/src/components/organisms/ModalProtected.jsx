import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Protected({ isOpen, onClose }) {


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" >
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <label> ¿No has iniciado sesión? </label>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} onClick={Logout}>
                  <Link to={'/'}>
                    Iniciar sesión
                  </Link>
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
