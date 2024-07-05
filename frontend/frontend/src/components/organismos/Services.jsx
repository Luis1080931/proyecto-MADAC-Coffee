import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import '../../styles/Servicies.css';
import v from '../../styles/variables';

const Services = () => {
    return (
        <Container className="my-5 container-border-green">
            <Row>
                <Col md={4} className="mb-4" style={{ fontFamily: 'unset' }}>
                    <Card className="h-100 servicio-card">
                        <Card.Body>
                            <div className="d-flex justify-content-center mb-3">
                                <img src={v.container1} alt="Container 1" className="img-fluid" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }} />
                            </div>
                            <Card.Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.1em'}}>
                                Con nosotros llevaras un registro de tus cultivos para estar al tanto
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4" style={{ fontFamily: 'unset' }}>
                    <Card className="h-100 servicio-card">
                        <Card.Body>
                            <div className="d-flex justify-content-center mb-3">
                                <img src={v.container2} alt="Container 2" className="img-fluid" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }} />
                            </div>
                            <Card.Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.1em'}}>
                            Te aseguraras de que tus trabajadores cumplan con sus actividades
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4" style={{ fontFamily: 'unset' }}>
                    <Card className="h-100 servicio-card">
                        <Card.Body>
                            <div className="d-flex justify-content-center mb-3">
                                <img src={v.container3} alt="Container 3" className="img-fluid" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }} />
                            </div>
                            <Card.Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.1em'}}>
                                Al final una buena administracion te dara muy buenos resultados
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    );
};

export default Services;
