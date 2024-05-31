import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function ProtectedRoute() {
  const auth = window.localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) {
      setModalOpen(true);
    }
  }, [auth]);

  if (auth) {
    return <Outlet />;
  }

  const volver = () => {
    setModalOpen(false)
    navigate('/')
  }

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
          <ModalBody>
            <label>¿No has iniciado sesión?</label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => volver()}>
              Iniciar sesión  
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProtectedRoute;
