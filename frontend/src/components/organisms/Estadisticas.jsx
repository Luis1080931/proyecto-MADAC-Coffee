import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient.js';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const AnalisisFisicosChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosClient.get('/analisis/listar');
      setData(result.data);
    };

    fetchData();
  }, []);

  const chartData = data.map(item => ({ x: item.mes, y: item.cantidad }));

  return (
    <div>
      <h2>Gráfico de cantidad de análisis físicos en los últimos 5 meses</h2>
      <VictoryChart width={600} height={400} padding={{ left: 80, right: 50, top: 50, bottom: 50 }}>
        <VictoryLabel text="Mes" x={300} y={30} textAnchor="middle"/>
        <VictoryLabel text="Cantidad" x={30} y={200} angle={-90} textAnchor="middle"/>
        <VictoryAxis tickFormat={t => t.substring(0, 3)} />
        <VictoryAxis dependentAxis />
        <VictoryLine data={chartData} />
      </VictoryChart>
    </div>
  );
};

export default AnalisisFisicosChart;
