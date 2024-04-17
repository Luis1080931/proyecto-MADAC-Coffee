import React, { useState, useRef } from 'react'
import { HeaderLogin } from './../molecules/HeaderLogin.jsx'
import './../../App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";
import {MailIcon} from './../atoms/IconEmail.jsx';
import {LockIcon} from './../atoms/LockIcon.jsx';
import AccionesModal from './../organisms/ModalAcciones.jsx'

export const Login = () => {

    const [mensaje, setMensaje] = useState('')
    const [modalAcciones, setModalAcciones] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const baseURL = "http://localhost:3000/validacion"


const correo_electronico = useRef(null)
const password = useRef(null)
const navigate = useNavigate()

const handleSubmit = (e) => {

e.preventDefault()

try {

  const emailValue = correo_electronico.current.value
  const passwordValue = password.current.value

  if(!emailValue || !passwordValue){
    setMensaje('Los campos son obligatorios')
    setModalAcciones(true)
    return
  }

  const data = {
    correo_electronico: emailValue,
    password: passwordValue
  }  
  
  axios.post(baseURL, data).then((response) => {
    console.log(response)
    if(response.status === 200){
      setMensaje('Bienvenido a MADAC-Coffee')
      setModalAcciones(true)
      setModalOpen(false)
      const {token} = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.user[0]))
      
    }else {
      console.log('Response', response)
      setMensaje('Credenciales incorrectas')
      setModalAcciones(true)
    }
  })
} catch (error) {
  console.log(error)
  alert('Error del servidor' + error)
}
    
}

const handleAccept = () => {
  if(mensaje === 'Bienvenido a MADAC-Coffee'){
    navigate('/dashboard')
  }
  setModalAcciones(false)
}

  return (
    <div className='fondo'>

        <HeaderLogin title="MADAC-Coffee" />

      <div className='w-11/12 flex justify-end items-end mt-5'>
            <Button className='w-28 p-2 rounded-lg bg-[#39A900] text-white font-bold text-xl z-10' onPress={() => setModalOpen(true)}>
                Login
            </Button>
        </div>

        <AccionesModal 
          isOpen={modalAcciones} 
          onClose={()=>setModalAcciones(false)}
          label={mensaje}
          onAccept={handleAccept}
        />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form method='post' onSubmit={handleSubmit}>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  required={true}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  ref={correo_electronico}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  required={true}
                  ref={password}
                />
                <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary" onSubmit={handleSubmit}>
                  Sign in
                </Button>
              </ModalFooter>
                </form>
                
                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}