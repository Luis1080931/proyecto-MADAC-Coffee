/* import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data }) => {
  const chartData = {
    labels: ['Atributo 1', 'Atributo 2', 'Atributo 3', 'Atributo 4', 'Atributo 5', 'Atributo 6'],
    datasets: [
      {
        label: 'Análisis Sensorial',
        data: data,
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

  return <Radar data={chartData} options={chartOptions} />;
};

export default RadarChart; */



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

export default RadarChart;

