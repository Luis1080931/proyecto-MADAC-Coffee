import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { Usuarios } from "./pages/Usuarios.jsx"
import { Fincas } from "./pages/Fincass.jsx"
import { Lotes } from "./pages/Lotes.jsx"
import { Muestras } from "./pages/Muestras.jsx"
import { Variables } from "./pages/Variables.jsx"
import VistaVariedades from "./pages/VistaVariedades.jsx"
import VistaAnalisis from "./pages/VistaAnalisis.jsx"
import { Resultados } from "./pages/Resultados.jsx"
import Ejemplo from './NextUI/TableNext.jsx'
import LoginModal from "./organisms/ModalLogin.jsx"
import ModalResultados from "./organisms/ModalResultados.jsx"
import { AuthProvider } from "../context/authContext.jsx"
import { NextUIProvider } from "@nextui-org/react"

function App() {

  return (
    <NextUIProvider>
      <AuthProvider>
        <BrowserRouter>    
        {/*   <Sidebar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/fincas" element={<Fincas />} />
              <Route path="/lotes" element={<Lotes />} />
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/variables" element={<Variables />} />
              <Route path="/muestras" element={<Muestras />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/variedades" element={<VistaVariedades />} />
              <Route path="/analisis" element={<VistaAnalisis />} />
              <Route path="/table" element={<Ejemplo />} />
              <Route path="/modallogin" element={<LoginModal />} />
              <Route path="/modalresultados" element={<ModalResultados />} />
            </Routes>

        </BrowserRouter>
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App;
