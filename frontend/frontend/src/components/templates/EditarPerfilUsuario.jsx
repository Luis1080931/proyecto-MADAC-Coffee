import React from 'react';
import Botones from '../atomos/Botones.jsx';
import Logo from '../../assets/logoOrigi.png';
import { Link } from 'react-router-dom';
import Header from '../organismos/Header/Header.jsx';
import Footer from '../organismos/Footer/Footer';
import Formulario from '../organismos/Formulario.jsx';

const EditarPerfilusuario = () => {
     const campos = [
         { name: 'nombres', type: 'text', placeholder: 'Nombres' },
         { name: 'apellidos', type: 'text', placeholder: 'Apellidos' },
         { name: 'correo', type: 'email', placeholder: 'Correo' },
         { name: 'direccion', type: 'text', placeholder: 'Dirección' },
         { name: 'rol', type: 'text', placeholder: 'Rol' },
     ];
         const formularioStyle = {
         padding: '20px',
        margin: '80px auto',
         maxWidth: '800px',
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'flex-start',
         borderRadius: '10px'
     };

     const labelStyle = {
         fontSize: '36px',
         fontWeight: 'bold',
         marginBottom: '20px',
         color: 'black',
         paddingEnd: '50px' 
     };

     const formularioinputs = {
         width: '100%', // Ajusta el ancho al 100% del contenedor
         maxWidth: '400px', // Establece un ancho máximo
     };

     return (
         <div style={{ display: 'flex', justifyContent: 'center', margin: '60px'}}>
             <Header/> 
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <form style={formularioStyle}>
                     <div style={{ marginRight: '30px' }}>
                     <label style={labelStyle}>Edicion Usuario</label>
                         <div style={formularioinputs}>
                           <Formulario campos={campos}/>
                         </div>
                         <div style={{ marginTop: '20px' }}>
                             <Link to='/Perfilprincipal'>
                                 <Botones children='Guardar' style={{ backgroundColor: 'green', border: 'none', padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold' }} />
                             </Link>
                         </div>
                     </div>
                     <img src={Logo} alt="" style={{ maxWidth: '350px', maxHeight: '350px', marginLeft: '20px', marginTop: '80px' }} />
                 </form>
             </div>
             <Footer/>
         </div>
     );
 };
 export default EditarPerfilusuario;
