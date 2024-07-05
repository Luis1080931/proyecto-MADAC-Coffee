import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import Header from "../organismos/Header/Header";
import { Modal, Button } from 'react-bootstrap';
import v from '../../styles/variables';

const EditarPerfilUsuarioPage = () => {
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editedUsuario, setEditedUsuario] = useState({
        nombre: '',
        apellido: '',
        correo: '',
    });

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
            setUsuario(usuarioData);
            setEditedUsuario({
                nombre: usuarioData.nombre,
                apellido: usuarioData.apellido,
                correo: usuarioData.correo
            });
            setIsLoading(false);
        } else {
            console.error('No se encontraron datos del usuario en localStorage');
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUsuario(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveChanges = async () => {
        if (!editedUsuario.nombre || !editedUsuario.apellido || !editedUsuario.correo) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        try {
            const response = await axios.put(`http://10.193.144.95:3000/actualizarUsuario/${usuario.id_usuario}`, editedUsuario);
            setUsuario(response.data.data);
            localStorage.setItem('usuario', JSON.stringify(response.data.data));
            setShowModal(false);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Error al actualizar el usuario.');
        }
    };

    if (isLoading) {
        return <div>Cargando perfil del usuario...</div>;
    }

    if (!usuario) {
        return <div>No se pudo cargar la información del usuario.</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundImage: `url(${v.ImgSlider1})`, backgroundSize: 'cover', paddingTop: "150px" }}>
            <Header />
            <div style={{ flex: 1, maxWidth: "800px", margin: "auto", padding: "50px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.9)", paddingBottom:"40px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333", textShadow: "2px 2px 4px rgba(0,0,0,0.2)", fontSize: "2.5em" }}>¡Bienvenido a tu Perfil de Usuario!</h1>
                <div style={{ border: "3px solid #ddd", borderRadius: "20px", padding: "30px", marginBottom: "40px", background: "rgba(255,255,255,0.8)", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", textAlign: "center" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {usuario.imagen ? (
                            <img src={`http://10.193.144.95:3000/${usuario.imagen}`} alt="Imagen de perfil" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '50%' }} />
                        ) : (
                            <div>No hay imagen de perfil</div>
                        )}
                    </div>

                    <div style={{marginTop: '20px'}}>
                        <strong style={{ color: "#333", fontSize: "1.4em" }}><AiOutlineUser style={{ color: "#ff5722", marginRight: "10px" }} />Nombre/s:</strong>
                        <div style={{ color: "#555", fontSize: "1.2em", fontWeight: '600'}}>{usuario.nombre}</div>
                    </div>

                    <div style={{marginTop: '20px'}}>
                        <strong style={{ color: "#333", fontSize: "1.4em" }}><AiOutlineUser style={{ color: "#ff5722", marginRight: "10px" }} />Apellido/s:</strong>
                        <div style={{ color: "#555", fontSize: "1.2em", fontWeight: '600'}}>{usuario.apellido}</div>
                    </div>

                    <div style={{marginTop: '20px' }}>
                        <strong style={{ color: "#333", fontSize: "1.4em" }}><AiOutlineMail style={{ color: "#ff5722", marginRight: "10px" }} />Correo:</strong>
                        <div style={{ color: "#555", fontSize: "1.2em", fontWeight: '600' }}>{usuario.correo}</div>
                    </div>
                    
                    <div style={{ marginTop: '40px', marginLeft: '480px', width: '50%'}}>
                        <Button variant="success" onClick={() => setShowModal(true)} style={{ fontWeight: '600', fontSize: "1.2em", width: '45%', height: '50px'}}>Editar Datos</Button>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" className="form-control" name="nombre" value={editedUsuario.nombre} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input type="text" className="form-control" name="apellido" value={editedUsuario.apellido} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Correo</label>
                            <input type="email" className="form-control" name="correo" value={editedUsuario.correo} onChange={handleInputChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditarPerfilUsuarioPage;
