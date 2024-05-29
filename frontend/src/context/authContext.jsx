import { createContext,  useState } from "react";
import axiosClient from "../components/axiosClient.js"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [result, setResults] = useState([]);
  const [user, setUser] = useState([])
  const [idUser, setIdUser] = useState([])

  const getUsers = async () => {
    try {
      axiosClient.get('/usuarios/listar').then((response) => {
        setResults(response.data);
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        result,
        idUser,
        user, 
        setUser,
        setIdUser,
        getUserID,
        setIsAuthenticated,
        getUsers,
        setResults,
      }}
    >
      {children}
    </AuthContext.Provider>
    )
};

export default AuthContext