import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { Usuarios } from "./pages/Usuarios.jsx"
import { Fincas } from "./pages/Fincas.jsx"
import { Lotes } from "./pages/Lotes.jsx"
import { Muestras } from "./pages/Muestras.jsx"
import { Variables } from "./pages/Variables.jsx"
import { VistaVariedades } from "./pages/VistaVariedades.jsx"
import { VistaAnalisis } from "./pages/VistaAnalisis.jsx"
import { Resultados } from "./pages/Resultados.jsx"


function App() {

  return (
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
        </Routes>

    </BrowserRouter>
  )
}

export default App;

