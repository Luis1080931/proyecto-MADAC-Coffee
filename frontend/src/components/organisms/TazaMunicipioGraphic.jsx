import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axiosClient from '../axiosClient';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TazaMunicipioChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/graphics/municipios');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: data.map(item => item.nombre),
        datasets: [
            {
                label: 'Punteo Final',
                data: data.map(item => item.punteo_final),
                backgroundColor: '#36A2EB',
                borderColor: '#003f5c',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Punteo Final: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            {/* <h2>Bar Chart - Mejores Punteos por Municipio</h2> */}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TazaMunicipioChart;
