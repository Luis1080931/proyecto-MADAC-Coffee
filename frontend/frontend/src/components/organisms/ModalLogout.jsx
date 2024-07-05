import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ isOpen, onClose }) {

  const navigate = useNavigate()

  const Logout = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" >
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <label> ¿Estas seguro que quieres cerrar la sesión? </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#273468] text-white" onPress={onClose} onClick={Logout}>
                  Confirmar
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
