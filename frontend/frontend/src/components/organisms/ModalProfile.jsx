import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "@nextui-org/react";
import { MailIcon } from "./../atoms/IconEmail.jsx";
import { LockIcon } from "./../atoms/LockIcon.jsx";
import AccionesModal from './../organisms/ModalAcciones.jsx'
import axios from "axios";

export default function ProfileModal({ isOpen, onClose }) {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const [modalAcciones, setModalAcciones] = useState(false)
  const [mensaje, setMensaje] = useState('')


  const identificacionuser = user.identificacion

  const identificacion = useRef(null)
  const telefono = useRef(null)
  const nombre = useRef(null)
  const correo_electronico = useRef(null)
  const tipo_usuario = useRef(null)
  const password = useRef(null)

  const [editedUser, setEditedUser] = useState({
    identificacion: user ? user.identificacion : "",
    nombre: user ? user.nombre : "",
    telefono: user ? user.telefono : "",
    tipo_usuario: user ? user.tipo_usuario : "",
    correo_electronico: user ? user.correo_electronico : "",
    password: user ? user.password : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {

    e.preventDefault()

    try {

      const data = {
        identificacion: identificacion.current.value,
        telefono: telefono.current.value,
        nombre: nombre.current.value,
        correo_electronico: correo_electronico.current.value,
        tipo_usuario: tipo_usuario.current.value,
        password: password.current.value,
      }

      axios.put(`http://10.193.144.95:3000/usuarios/actualizar/${identificacionuser}`, data).then((response) => {
      console.log(data)
      if(response.status==201){
        setMensaje('Usuario actualizado con exito')
        setModalAcciones(true)
      }else{
        alert('Error de actualizar')
      }
    })
    } catch (error) {
      console.log('Error de solicitud' + error)
    }
  }

  const handleAccept = () => {
    setModalAcciones(false)
    onClose()
  }

  return (
    <>
      <AccionesModal 
        isOpen={modalAcciones}
        onClose={() => setModalAcciones(false)}
        label={mensaje}
        onAccept={handleAccept}
      />
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Perfil del usuario
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleUpdate}>

                <Input
                  autoFocus
                  name="identificacion"
                  label="Identificacion"
                  placeholder="Numero de identificacion"
                  variant="bordered"
                  ref={identificacion}
                  value={editedUser.identificacion}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  name="nombre"
                  label="Nombre del usuario"
                  placeholder="Nombre del usuario"
                  variant="bordered"
                  ref={nombre}
                  value={editedUser.nombre}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  name="telefono"
                  label="Telefono del usuario"
                  placeholder="Numero de telefono"
                  variant="bordered"
                  ref={telefono}
                  value={editedUser.telefono}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  name="tipo_usuario"
                  label="Rol del usuario"
                  placeholder="Administrador o Usuario común"
                  variant="bordered"
                  ref={tipo_usuario}
                  value={editedUser.tipo_usuario}
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  name="correo_electronico"
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  variant="bordered"
                  ref={correo_electronico}
                  value={editedUser.correo_electronico}
                  onChange={handleInputChange}
                />
                <Input
                  name="password"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  type="password"
                  variant="bordered"
                  ref={password}
                  value={editedUser.password}
                  onChange={handleInputChange}
                />
              
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" className="bg-[#273468] text-white">
                  Actualizar
                </Button>
              </ModalFooter>
              </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
