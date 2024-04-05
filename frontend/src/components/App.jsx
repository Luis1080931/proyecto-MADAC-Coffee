import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Usuarios } from "./pages/Usuarios.jsx"




function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>

    </BrowserRouter>

  )
}

export default App
