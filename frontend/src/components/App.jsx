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
import NotFoundPage from "./pages/NotFoundPages.jsx"
import { AuthProvider } from "../context/authContext.jsx"
import { NextUIProvider } from "@nextui-org/react"
import ProtectedRoute from "../Protected.jsx"
import SliderVertical from "./organisms/Slider.jsx"
import AnalisisFisicosChart from "./organisms/Estadisticas.jsx"

const stored = localStorage.getItem('user')
const user = stored ? JSON.parse(stored) : null

function App() {

  return (
    <NextUIProvider>
      <AuthProvider>
        <BrowserRouter>    
        {/*   <Sidebar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />} > 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fincas" element={<Fincas />} />
                <Route path="/lotes" element={<Lotes />} />
                <Route path="/resultados" element={<Resultados />} />
                <Route path="/variables" element={<Variables />} />
                <Route path="/muestras" element={<Muestras />} />
                <Route path="/variedades" element={<VistaVariedades />} />
                <Route path="/analisis" element={<VistaAnalisis />} />
                <Route path="/slider" element={<SliderVertical />} />
                <Route path="/estadisticas" element={<AnalisisFisicosChart />} />
                {user && user.tipo_usuario === 'admin' && (
                  <Route path="/usuarios" element={<Usuarios />} />
                )}
              </Route>
              <Route path="*" element={<NotFoundPage />}/>
            </Routes>

        </BrowserRouter>
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App;
