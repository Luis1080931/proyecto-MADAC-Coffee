import React from "react";
import Boton from "../atomos/Botones";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Reportes() {
  return (
    <div>
      <div className="container" style={{ marginTop: "8%" }}>
        <Header />
        <h2 style={{ display: "inline-block", marginRight: "20px", textAlign: "center" }}>Reporte inversiones</h2>

        <div style={{ float: "right", marginRight: "20px" }}>
          <Boton children="Descargar" onClick={() => handleOpenModal("Registrar")} />
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6" style={{ borderRight: "1px solid #ccc" }}>

            <div className="row">
              <div className="col-md-12">
                <h3 style={{ marginLeft: '180px', fontSize: '1.3em' }}>Ingresos y Egresos</h3>
                <p style={{ fontWeight: 'bolder' }}>Hasta el mes de junio:</p>
                <BarChart
                  width={500}
                  height={300}
                  data={[
                    { name: "Enero", price: 1200, sell: 500 },
                    { name: "Febrero", price: 1800, sell: 1000 },
                    { name: "Marzo", price: 1500, sell: 800 },
                    { name: "Abril", price: 2500, sell: 1500 },
                    { name: "Mayo", price: 2000, sell: 1200 },
                    { name: "Junio", price: 2800, sell: 2000 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#3FD637" name="Ingresos" />
                  <Bar dataKey="sell" fill="#F44336" name="Egresos" />
                </BarChart>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4 style={{ textAlign: 'center', fontSize: '1.3em' }}>Ingresos y Egresos</h4>
            <p style={{ fontWeight: 'bolder' }}>Despues de junio:</p>
            <div className="row">
              <div className="col-md-6">
                <BarChart
                  width={500}
                  height={300}
                  data={[
                    { name: "Julio", price: 1200, sell: 1000 },
                    { name: "Agosto", price: 2500, sell: 1800 },
                    { name: "Septi..", price: 2700, sell: 2000 },
                    { name: "Octubre", price: 2000, sell: 1700 },
                    { name: "Novie..", price: 2500, sell: 1800 },
                    { name: "Diciembre", price: 1700, sell: 800 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#3FD637" name="Ingresos" />
                  <Bar dataKey="sell" fill="#F44336" name="Egresos" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reportes;
