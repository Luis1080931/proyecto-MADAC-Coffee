import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { Muestras } from "./pages/Muestras.jsx"
import { Variables } from "./pages/Variables.jsx"


function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/variables" element={<Variables />} />
          <Route path="/muestras" element={<Muestras />} />
        </Routes>

    </BrowserRouter>
  )
}

export default App;
