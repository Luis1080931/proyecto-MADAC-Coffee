import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { VistaAnalisis } from './pages/VistaAnalisis.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnalisisRegistrar } from './pages/AnalisisRegistrar.jsx';
import { AnalisisActualizar } from './pages/AnalisisActualizar.jsx';


import { VistaVariedades } from './pages/VistaVariedades.jsx';
import { VariedadesRegistrar } from './pages/VariedadesRegistrar.jsx';
import { VariedadesActualizar } from './pages/VariedadesActualizar.jsx';




function App() {

  return (
    <BrowserRouter>    
    <Routes>
    {/* <Route path='/' element={<VistaAnalisis/>} />
      <Route path='/analisisregistrar' element={<AnalisisRegistrar/>} />
      <Route path='/analisisactualizar' element={<AnalisisActualizar/>} /> */}

      
    <Route path='/' element={<VistaVariedades/>} />
      <Route path='/variedadesregistrar' element={<VariedadesRegistrar/>} />
      <Route path='/variedadesactualizar' element={<VariedadesActualizar/>} />
     </Routes>
      {/* <VistaAnalisis/> */}

    </BrowserRouter>
  )
}

export default App;
