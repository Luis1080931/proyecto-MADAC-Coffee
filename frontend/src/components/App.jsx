import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Usuarios } from "./pages/Usuarios.jsx";
import { Fincas } from "./pages/Fincass.jsx";
import { Lotes } from "./pages/Lotes.jsx";
import { Muestras } from "./pages/Muestras.jsx";
import { Variables } from "./pages/Variables.jsx";
import VistaVariedades from "./pages/VistaVariedades.jsx";
import VistaAnalisis from "./pages/VistaAnalisis.jsx";
import { Resultados } from "./pages/Resultados.jsx";
import NotFoundPage from "./pages/NotFoundPages.jsx";
import { NextUIProvider } from "@nextui-org/react";
import ProtectedRoute from "../Protected.jsx";
import SliderVertical from "./organisms/Slider.jsx";
import AnalisisFisicosChart from "./organisms/Estadisticas.jsx";
import PDFReport from "./organisms/Reportes.jsx";
import VistaAnalisisCatador from "./pages/AnalisisCatador.jsx";
import { ResultadosCatador } from "./pages/ResultadosCatador.jsx";
import GlobalProvider from "../context/GlobalContext.jsx";
import { Reportes } from "./pages/Reportes.jsx";
import { ResultadosSensorialCatador } from "./pages/ResultadosSensorial.jsx";

const stored = localStorage.getItem('user');
const user = stored ? JSON.parse(stored) : null;

function App() {
  return (
    <NextUIProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/slider" element={<SliderVertical />} />
              <Route path="/estadisticas" element={<AnalisisFisicosChart />} />
              <Route path="/pdf" element={<PDFReport />} />
              <Route path="/analisis" element={<VistaAnalisis />} />
              {/* {user && user.tipo_usuario === 'admin' && (
                <> */}
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/fincas" element={<Fincas />} />
                  <Route path="/lotes" element={<Lotes />} />
                  <Route path="/resultados" element={<Resultados />} />
                  <Route path="/sensorial" element={<ResultadosSensorialCatador />} />
                  <Route path="/variables" element={<Variables />} />
                  <Route path="/muestras" element={<Muestras />} />
                  <Route path="/variedades" element={<VistaVariedades />} />
                {/* </>
              )} */}
             {/*  {user && user.tipo_usuario === 'catador' && (
                <> */}
                  <Route path="/analisisCatador" element={<VistaAnalisisCatador />} />
                  <Route path="/resultadosCatador" element={<ResultadosCatador />} />
                  <Route path="/resultadosSensorial" element={<ResultadosSensorialCatador />} />
                {/* </>
              )} */}
              <Route path="/reportes" element={<Reportes />} />
              </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </NextUIProvider>
  );
}

export default App;
