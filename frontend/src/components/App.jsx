import {Resultados} from "./pages/Resultados.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RegistrarResultados } from "./pages/RegistrarResultados.jsx"
import { ActualizarResultado } from "./pages/ActualizarResultado.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import ResultadosModal from "./organisms/ResultadosModal.jsx"


function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/resultadosregistrar" element={<RegistrarResultados />} />
          <Route path="/resultadosactualizar" element={<ActualizarResultado />} />
          <Route path="/modal" element={<ResultadosModal />} />
        </Routes>

    </BrowserRouter>

  )
}

export default App
