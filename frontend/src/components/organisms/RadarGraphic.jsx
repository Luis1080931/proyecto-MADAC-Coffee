/* import React, { useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import html2canvas from 'html2canvas';

// Registra los componentes necesarios
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ datos }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: ['Fragancia aroma', 'Puntaje general', 'Dulzor', 'Taza limpia', 'Balance', 'Uniformidad', 'Cuerpo', 'Acidez', 'Retrogusto', 'Sabor'],
    datasets: [
      {
        label: 'Análisis Sensorial',
        data: [datos.aroma, datos.punteo, datos.dulzura, datos.taza_limpia, datos.balance, datos.uniformidad, datos.cuerpo, datos.acidez, datos.postgusto, datos.sabor],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  const handleCapture = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'radar-chart.png';
        link.click();
      });
    }
  };

  return (
    <div>
      <div ref={chartRef} style={{ width: '300px', height: '300px' }}>
        <Radar data={chartData} options={chartOptions} />
      </div>
      <button onClick={handleCapture}>Capturar Gráfica</button>
    </div>
  );
};

export default RadarChart; */

// RadarChartToBase64.jsx
// RadarChartToBase64.jsx
// RadarGraphicToBase64.jsx
import React, { useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChartToBase64 = ({ data, onBase64Ready }) => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    new ChartJS(ctx, {
      type: 'radar',
      data: {
        labels: ['Attribute 1', 'Attribute 2', 'Attribute 3', 'Attribute 4', 'Attribute 5'],
        datasets: [{
          label: 'Sensory Analysis',
          data,
          backgroundColor: 'rgba(34, 202, 236, 0.2)',
          borderColor: 'rgba(34, 202, 236, 1)',
          borderWidth: 1,
        }],
      },
    });
    onBase64Ready(canvas.toDataURL());
  }, [data, onBase64Ready]);

  return null;
};

export default RadarChartToBase64;






/* import React, { useEffect, useRef } from 'react';
import echarts from 'echarts';
import 'echarts/charts'; // Importa todos los tipos de gráficos
import 'echarts/components/title';
import 'echarts/components/tooltip';
import 'echarts/components/legend';


const RadarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const options = {
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Aroma', max: 100 },
          { name: 'Sabor', max: 100 },
          { name: 'Retrogusto', max: 100 },
          { name: 'Acidez', max: 100 },
          { name: 'Cuerpo', max: 100 },
          { name: 'Uniformidad', max: 100 },
          { name: 'Balance', max: 100 },
          { name: 'Taza limpia', max: 100 },
          { name: 'Dulzor', max: 100 },
        ],
        center: ['50%', '50%'],
        radius: '60%',
      },
      series: [{
        type: 'radar',
        data: [{
          value: data,
          name: 'Puntuación',
        }],
      }],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default RadarChart; */


// Importa las bibliotecas necesarias
/* import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current && data) {
      const chart = chartRef.current.chart;
      chart.update({
        series: [{
          type: 'radar',
          data: data,
        }],
      }, true);
    }
  }, [data]);

  const options = {
    chart: {
      polar: true,
      type: 'radar',
    },
    title: {
      text: 'Radar Chart',
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    series: [{
      name: 'Series 1',
      data: data,
    }],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default RadarChart;
 */

/* import React from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryLabel, VictoryGroup, VictoryArea } from 'victory';

const RadarChart = () => {
  // Datos de ejemplo para la gráfica radar
  const data = [
    { subject: 'Fragancia aroma', score: 20 },
    { subject: 'Sabor', score: 98 },
    { subject: 'Retrogusto', score: 86 },
    { subject: 'Acidez', score: 99 },
    { subject: 'Cuerpo', score: 85 },
    { subject: 'Uniformidad', score: 85 },
    { subject: 'Balance', score: 85 },
    { subject: 'Taza limpia', score: 85 },
    { subject: 'Dulzor', score: 85 },
    { subject: 'Puntaje general', score: 85 },
    { subject: 'Puntaje total', score: 85 },
  ];

  return (
    <VictoryChart polar theme={{}}>
      <VictoryPolarAxis
        labelPlacement="perpendicular"
        tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
        style={{
          axis: { stroke: 'none' },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />

      <VictoryGroup
        colorScale={['#ffcc00']}
        style={{
          data: { fillOpacity: 0.4, strokeWidth: 2 },
        }}
      >
        <VictoryArea data={data} x="subject" y="score" />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default RadarChart; */
/* 
import React from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryLabel, VictoryGroup, VictoryArea } from 'victory';

const RadarChart = ({ data }) => (
  <VictoryChart polar theme={{}}>
    <VictoryPolarAxis
      labelPlacement="perpendicular"
      tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
      style={{
        axis: { stroke: 'none' },
        tickLabels: { fontSize: 10, padding: 5 },
      }}
    />
    <VictoryGroup
      colorScale={['#ffcc00']}
      style={{
        data: { fillOpacity: 0.4, strokeWidth: 2 },
      }}
    >
      <VictoryArea data={data} x="subject" y="score" />
    </VictoryGroup>
  </VictoryChart>
);

export default RadarChart; */

