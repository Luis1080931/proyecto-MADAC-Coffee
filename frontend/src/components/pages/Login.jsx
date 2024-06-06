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
    const [modalOpen, setModalOpen] = useState(true)

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

      <div 
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh'
      }}
      className='flex justify-center items-center'
      >
        <div className='bg-white rounded-lg w-[870px] bg-transparent'>
          <div className='flex flex-row justify-center content-center items-center'>
            <img className='w-[500px] h-[600px] mr-10' src={caficultor} alt="" />
          <form method='post' onSubmit={handleSubmit} className='mr-8'>
            <div className='mb-5 text-center'>
              <label className='text-2xl font-semibold'> Inicio de sesión</label>
              <Input
                className='w-[300px] mt-5'
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
            <div className='flex flex-col items-center mt-5'>
              <Button type='submit' className='bg-[#273468] text-white font-bold' onSubmit={handleSubmit}>
                Iniciar sesión
              </Button>
              <div className="flex py-2 px-1 justify-between">
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
            </div>
          
          </div>
          </form>
          </div>  

        </div>
        </div>

        <AccionesModal 
          isOpen={modalAcciones} 
          onClose={()=>setModalAcciones(false)}
          label={mensaje}
          onAccept={handleAccept}
        />
    </div>
  )
}