import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RegistrarLotes } from "./pages/RegistrarLotes.jsx"
import { ActualizarLotes } from "./pages/ActualizarLotes.jsx"
import { Lotes } from "./pages/Lotes.jsx"
import { ActualizarFincas } from "./pages/ActualizarFincass.jsx"
import { RegistrarFincas } from "./pages/RegistrarFincass.jsx"
import { Fincas } from "./pages/Fincass.jsx"

function App() {

  return (
    <BrowserRouter>    
     { <RegistrarLotes/>}

    </BrowserRouter>

  )
}
export default App
