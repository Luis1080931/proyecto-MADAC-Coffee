import {Resultados} from "./pages/Resultados.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard.jsx"
import ResultadosModal from "./organisms/ResultadosModal.jsx"
import Ejemplo from "./NextUI/TableNext.jsx"


function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/modal" element={<ResultadosModal />} />
          <Route path="/table" element={<Ejemplo />} /> 
        </Routes>

    </BrowserRouter>

  )
}

export default App
