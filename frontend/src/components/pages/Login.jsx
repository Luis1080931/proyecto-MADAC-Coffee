import React, { useState, useRef } from 'react'
import { HeaderLogin } from './../molecules/HeaderLogin.jsx'
import './../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox} from "@nextui-org/react";
import {MailIcon} from './../atoms/IconEmail.jsx';
import {LockIcon} from './../atoms/LockIcon.jsx';
import AccionesModal from './../organisms/ModalAcciones.jsx'
import caficultor from './../../assets/icons/caficultor.jpg'
import fondo from './../../assets/icons/img-fondo.jpg'

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
      
      const {token, user} = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.user[0]))

      const userRol = user[0]?.tipo_usuario
      
      if(userRol === 'caficultor'){
        setMensaje('Usuario no autorizado')
        setModalAcciones(true)
      }else{
        setMensaje('Bienvenido a MADAC-Coffee')
        setModalAcciones(true)
        setModalOpen(false)
      }
      
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
    <div>

        <HeaderLogin title="MADAC-Coffee" />

      <div 
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh'
      }}
      >
            <Button className='w-28 m-10 rounded-lg bg-[#B7CFDC] text-black font-bold text-xl' onPress={() => setModalOpen(true)}>
                Login
            </Button>
        </div>

        <AccionesModal 
          isOpen={modalAcciones} 
          onClose={()=>setModalAcciones(false)}
          label={mensaje}
          onAccept={handleAccept}
        />

      <Modal size='3xl' isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <div className='flex flex-row justify-center content-center items-center'>
                  <img className='w-80 h-96 mr-10 rounded-lg' src={caficultor} alt="" />
                <form method='post' onSubmit={handleSubmit}>
                  <div className='mb-5'>
                    <Input
                      className='w-[300px]'
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      required={true}
                      label="Email"
                      placeholder="Ingresa tu correo"
                      variant="bordered"
                      ref={correo_electronico}
                    />
                  </div>
                  <div>
                    <Input
                      className='w-[300px]'
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Ingresa tu contraseña"
                      type="password"
                      variant="bordered"
                      required={true}
                      ref={password}
                    />
                  </div> 
                
                <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary" onSubmit={handleSubmit}>
                  Sign in
                </Button>
              </ModalFooter>
                </form>
                </div>  
                
                
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}