import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Usuarios } from "./pages/Usuarios.jsx"
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions.js"




function App() {

  return (
    <BrowserRouter>    
    {/*   <Sidebar /> */}
        <Routes>
          
          <Route path="/" element={<Usuarios />} />
        </Routes>

    </BrowserRouter>

  )
}

export default App
