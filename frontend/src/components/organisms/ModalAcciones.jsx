import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function AccionesModal({ label, isOpen, onClose, onAccept }) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">  </ModalHeader>
              <ModalBody>
                
                <label> {label} </label>

              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#273468] text-white" onClick={onClose} onPress={onAccept}>
                  Aceptar
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
