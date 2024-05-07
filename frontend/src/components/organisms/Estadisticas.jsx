import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient.js';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const AnalisisFisicosChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosClient.get('/analisis/listar');
      setData(result.data)
    };

    fetchData()
  }, [])

  // Mapea los datos para x (mes) y y (cantidad de análisis)
  const chartData = data.map(item => ({ x: item.mes, y: item.cantidad }));

  // Configuración de los nombres de los meses para el eje x
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <div className='w-7/12'>
      <h2 className='text-2xl'>Gráfico de cantidad de análisis físicos en los últimos 5 meses</h2>
      <VictoryChart width={600} height={400} padding={{ left: 80, right: 50, top: 50, bottom: 50 }}>
        <VictoryLabel text="Mes" x={300} y={30} textAnchor="middle"/>
        <VictoryLabel text="Cantidad" x={30} y={200} angle={-90} textAnchor="middle"/>
        <VictoryAxis tickValues={months} tickFormat={(t) => months.indexOf(t) + 1} />
        <VictoryAxis dependentAxis />
        <VictoryLine data={chartData} />
      </VictoryChart>
    </div>
  )
}

export default AnalisisFisicosChart;
