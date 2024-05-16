import { createContext,  useState } from "react";
import axiosClient from "../components/axiosClient.js";
import AccionesModal from './../components/organisms/ModalAcciones.jsx';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([])
  const [idUser, setIdUser] = useState([])
  const [mensaje, setMensaje] = useState([])
  const [modalAcciones, setModalAcciones] = useState(false)

  const getUsers = async () => {
    try {
      axiosClient.get('/usuarios/listar').then((response) => {
        setUsers(response.data.data);
      })
    } catch (error) {
      console.log('Error del servidor' + error);;
    }
  }

  const getUserID = async (id) => {
    try {
      axiosClient.get(`/usuarios/buscar/${id}`).then((response) => {
        setIdUser(response.data)
      })
    } catch (error) {
      console.log('Error del servidor' +error);
    }
  }

  const createUsers = async (data) => {
    try {
      axiosClient.post(`/usuarios/registrar`, data).then((response) => {
        if(response.status === 201){
          setMensaje(response.data.message)
          setModalAcciones(true)
          setModalOpen(false)
          getUsers();
      }else{
          alert('Error: ')
      }
      })
    } catch (error) {
      console.log('Error del servidor'+ error);
    }
  };

  const updateUsers = async (id, data) => {
    try {
      axiosClient.put(`/usuarios/actualizar/${id}`, data).then((response) => {
        if(response.status === 201){
          setMensaje(response.data.message)
          setModalAcciones(true)
          setModalOpen(false)
          getUsers();
      }else{
        alert('Error: ')
      }
    })
    } catch (error) {
      console.log('Error del servidor' + error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        users,
        idUser,
        user, 
        setUser,
        setIdUser,
        getUserID,
        setIsAuthenticated,
        getUsers,
        createUsers,
        updateUsers,
        setUsers,
      }}
    >
      <AccionesModal 
        isOpen={modalAcciones}
        onClose={() => setModalAcciones(false)}
        label={mensaje}
      />
      
      {children}
    </AuthContext.Provider>
    )
};

export default AuthContext