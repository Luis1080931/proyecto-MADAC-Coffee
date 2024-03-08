import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { Usuarios } from "./pages/Usuarios.jsx"
import { RegistrarUsuarios } from "./pages/RegistrarUsuarios.jsx"
import { ActualizarUsuarios } from "./pages/ActualizarUsuarios.jsx"
import { Fincas } from "./pages/Fincas.jsx"
import { RegistrarFincas } from "./pages/RegistrarFincas.jsx"
import { ActualizarFincas } from "./pages/ActualizarFincas.jsx"
import { Lotes } from "./pages/Lotes.jsx"
import { RegistrarLotes } from "./pages/RegistrarLotes.jsx"
import { ActualizarLotes } from "./pages/ActualizarLotes.jsx"
import { Muestras } from "./pages/Muestras.jsx"
import { RegistrarMuestras } from "./pages/RegistrarMuestras.jsx"
import { ActualizarMuestras } from "./pages/ActualizarMuestra.jsx"
import { Variables } from "./pages/Variables.jsx"
import { RegistrarVariables } from "./pages/RegistrarVariables.jsx"
import { ActualizarVariables } from "./pages/ActualizarVariables.jsx"
import { VistaVariedades } from "./pages/VistaVariedades.jsx"
import { VariedadesRegistrar } from "./pages/VariedadesRegistrar.jsx"
import { VariedadesActualizar } from "./pages/VariedadesActualizar.jsx"
import { VistaAnalisis } from "./pages/VistaAnalisis.jsx"
import { AnalisisRegistrar } from "./pages/AnalisisRegistrar.jsx"
import { AnalisisActualizar } from "./pages/AnalisisActualizar.jsx"
import { Resultados } from "./pages/Resultados.jsx"
import { RegistrarResultados } from "./pages/RegistrarResultados.jsx"
import { ActualizarResultado } from "./pages/ActualizarResultados.jsx"




function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route path="/variables" element={<Variables />} />
          <Route path="/variablesregistrar" element={<RegistrarVariables />} />
          <Route path="/variablesactualizar" element={<ActualizarVariables />} /> 
          <Route path="/muestras" element={<Muestras />} />
          <Route path="/muestrasregistrar" element={<RegistrarMuestras />} />
          <Route path="/muestrasactualizar" element={<ActualizarMuestras />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuariosregistrar" element={<RegistrarUsuarios />} />
          <Route path="/usuariosactualizar" element={<ActualizarUsuarios />} />
          <Route path="/variedades" element={<VistaVariedades />} />
          <Route path="/variedadesregistrar" element={<VariedadesRegistrar />} />
          <Route path="/variedadesactualizar" element={<VariedadesActualizar />} />
          <Route path="/analisis" element={<VistaAnalisis />} />
          <Route path="/analisisregistrar" element={<AnalisisRegistrar />} />
          <Route path="/analisisactualizar" element={<AnalisisActualizar />} />
        </Routes>

    </BrowserRouter>
  )
}

export default App;
