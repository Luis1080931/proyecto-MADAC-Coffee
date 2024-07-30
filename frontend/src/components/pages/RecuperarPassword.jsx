import React, { useEffect, useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AccionesModal from '../organisms/ModalAcciones';

const RecuperarPassword = () => {

  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [back, setBack] = useState(false)
  const [errors, setErrors] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
 
  const handleChange = (e) => {
    setCorreo(e.target.value);
  };

  useEffect(() => {
    setBack(false)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const datos = {
            correo: correo
        }
      axios.post('http://localhost:3000/recuperar', datos).then((response) => {

          console.log('Mensjae',response.data.message);
          setMensaje(response.data.message)
          setModalOpen(true)
          setBack(true)
          setCorreo('')
          
      })
    } catch (error) {
      setErrors([error.response?.data?.message || "Error en la solicitud"])
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-[#F0F4F8] relative">
      <div className="absolute top-8 left-8 flex items-center">
        <img
          src="./src/assets/logoProyeccto-removebg.png"
          alt="Placeholder Image"
          className="w-28 h-28 mr-2"
        />
        <span className="text-[#273468] font-bold text-3xl">MADAC-COFFEE</span>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          {errors && errors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center rounded-md" key={i}>
              {error}
            </div>
          ))}
          {mensaje && (
            <div className="bg-green-500 p-2 text-white text-center rounded-md">
              {mensaje}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-6 text-[#273468] text-center">Restablecer Contraseña</h2>
          <Input
            label="Correo de usuario"
            aria-label="Correo de usuario"
            variant="bordered"
            isRequired
            isClearable
            type="correo"
            value={correo}
            name="correo"
            onChange={handleChange}
            className="border-[#273468]"
          />
          <div className="flex gap-x-4 w-full justify-center">
            {back ? (
              <Button
                type="button"
                color="default"
                onClick={() => navigate("/")}
                className="text-[#273468] bg-[#FDFBF6] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#39A800] border-2"
              >
                Volver
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  color="default"
                  onClick={() => navigate("/")}
                  className="text-[#273468] bg-[#FDFBF6] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#273468] border-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="text-[#FDFBF6] bg-[#273468] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#FDFBF6]"
                >
                  Enviar Gmail
                </Button>
              </>
            )}
          </div>
        </form>
        <AccionesModal 
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAccept={() => setModalOpen(false)}
            label={mensaje}
        />
      </div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#273468] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#273468] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-[#273468] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  );
}

export default RecuperarPassword;