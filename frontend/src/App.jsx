import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Fincas } from "./components/pages/Fincass.jsx"
import { RegistrarFincas } from "./components/pages/RegistrarFincass.jsx"
import { ActualizarFincas } from "./components/pages/ActualizarFincass.jsx"
import { Lotes } from "./components/pages/Lotes.jsx"
import { RegistrarLotes } from "./components/pages/RegistrarLotes.jsx"
import { ActualizarLotes } from "./components/pages/ActualizarLotes.jsx"
function App() {

  return (
    <BrowserRouter>    
     { <ActualizarLotes/>}
    </BrowserRouter>

  )
}
export default App
