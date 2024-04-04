import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Fincas } from "./components/pages/Fincass.jsx"
import { RegistrarFincas } from "./components/pages/RegistrarFincass.jsx"
import { ActualizarFincas } from "./components/pages/ActualizarFincass.jsx"
import { Lotes } from "./components/pages/Lotes.jsx"
import { RegistrarLotes } from "./components/pages/RegistrarLotes.jsx"
import { ActualizarLotes } from "./components/pages/ActualizarLotes.jsx"
import {FormFincass} from './components/molecules/FormFincass.jsx'
function App() {

  return (
    <BrowserRouter>    
    { <FormFincass/>}
    </BrowserRouter>

  )
}
export default App
