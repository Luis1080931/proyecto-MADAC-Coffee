import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RegistrarResultados } from "./pages/RegistrarResultados.jsx"
import { ActualizarResultado } from "./pages/ActualizarResultado.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { Resultados } from "./pages/Resultados.jsx"
import { Usuarios } from "./pages/Usuarios.jsx"
import { Fincas } from "./pages/Fincas.jsx"
import { RegistrarFincas } from "./pages/RegistrarFincas.jsx"
import { ActualizarFincas } from "./pages/ActualizarFincas.jsx"
import { Lotes } from "./pages/Lotes.jsx"
import { RegistrarLotes } from "./pages/RegistrarLotes.jsx"
import { ActualizarLotes } from "./pages/ActualizarLotes.jsx"
import { ActualizarUsuarios } from "./pages/ActualizarUsuarios.jsx"
import { RegistrarUsuarios } from "./pages/RegistrarUsuarios.jsx"
import { Login } from "./pages/Login.jsx"


function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fincas" element={<Fincas />} />
          <Route path="/fincasregistrar" element={<RegistrarFincas />} />
          <Route path="/fincasactualizar" element={<ActualizarFincas />} />
          <Route path="/lotes" element={<Lotes />} />
          <Route path="/lotesregistrar" element={<RegistrarLotes />} />
          <Route path="/lotesactualizar" element={<ActualizarLotes />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/resultadosregistrar" element={<RegistrarResultados />} />
          <Route path="/resultadosactualizar" element={<ActualizarResultado />} />
          <Route path="/usuarios" element={<Usuarios/>} />
          <Route path="/usuariosactualizar" element={<ActualizarUsuarios/>}/>
          <Route path="/usuariosregistrar" element={<RegistrarUsuarios/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>

    </BrowserRouter>

  )
}

export default App
