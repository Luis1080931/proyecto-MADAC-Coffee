/* import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient.js';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const AnalisisFisicosChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient.get('/analisis/fisicos').then((response) => {
      console.log(response.data)
      setData(response.data)
    })
  }, [])

  const contarAnalisisPorMes = () => {
    const analisisPorMes = Array(12).fill(0); 
    
    data.forEach(item => {
      const mes = new Date(item.fecha).getMonth(); 
      analisisPorMes[mes]++;
    });
    
    return analisisPorMes;
  }


  const chartData = contarAnalisisPorMes().map((cantidad, index) => ({ x: index + 1, y: cantidad }));
  
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <div className='w-7/12'>
      <h2 className='text-2xl'>Gráfico de cantidad de análisis físicos en los últimos 5 meses</h2>
      <VictoryChart width={600} height={400} padding={{ left: 80, right: 50, top: 50, bottom: 50 }}>
        <VictoryLabel text="Mes" x={300} y={30} textAnchor="middle"/>
        <VictoryLabel text="Cantidad" x={30} y={200} angle={-90} textAnchor="middle"/>
        <VictoryAxis tickValues={months} tickFormat={(t, i) => i + 1} />
        <VictoryAxis dependentAxis />
        <VictoryLine data={chartData} />
      </VictoryChart>
    </div>
  )
}

export default AnalisisFisicosChart; */

import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AnalisisFisicosChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient.get('/analisis/fisicos').then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  const contarAnalisisPorMes = () => {
    const analisisPorMes = Array(12).fill(0);

    data.forEach(item => {
      const mes = new Date(item.fecha).getMonth();
      analisisPorMes[mes]++;
    });

    return analisisPorMes;
  };

  const chartData = contarAnalisisPorMes();
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const dataForChart = {
    labels: months,
    datasets: [
      {
        label: 'Cantidad de Análisis',
        data: chartData,
        fill: false,
        borderColor: '#007bff',
        tension: 0.1
      }
    ]
  };

  return (
    <div className=''>
      {/* <h2 className='text-sm'>Gráfico de cantidad de análisis físicos en los últimos 12 meses</h2> */}
      <Line 
        data={dataForChart} 
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `Cantidad: ${tooltipItem.raw}`
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad'
              },
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return Number.isInteger(value) ? value : ''; 
                }
              }
            }
          }
        }} 
      />
    </div>
  );
};

export default AnalisisFisicosChart;
