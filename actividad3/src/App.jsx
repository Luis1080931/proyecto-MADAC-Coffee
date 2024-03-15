import { useState } from 'react';
import './App.css'; 
import axios from 'axios';



function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/usuarios/registrar')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching usuarios:', error));
  }, []);
  return (
    <>
      <div className="formulario">
        <h2>Formulario de registro de usuario</h2>
        <label htmlFor="identificacion">Ingrese su identificación</label>
        
        <input type="text" id='identificacion' placeholder='Identificación' />
        <label htmlFor="telefono">Ingrese su teléfono</label>
        <input type="text" id='telefono' placeholder='Teléfono' />
        <label htmlFor="nombre">Ingrese su nombre</label>
        <input type="text" id='nombre' placeholder='Nombre' />
        <label htmlFor="correo_electronico">Ingrese su correo</label>
        <input type="text" id='correo_electronico' placeholder='Correo electrónico' />
        <label htmlFor="tipo_usuario">Ingrese su tipo de usuario</label>
        <select id="tipo_usuario" name="tipo_usuario">
          <option value="cliente">Catador</option>
          <option value="empleado">Caficultor</option>
        </select>
        <button id='registrar'>Registrar</button>
      </div>
    </>
  );
}

export default App;

