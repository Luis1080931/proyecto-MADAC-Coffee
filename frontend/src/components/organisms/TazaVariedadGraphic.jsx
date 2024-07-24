import React, { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axiosClient from '../axiosClient';

// Registra los componentes necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const TazaVariedadChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/graphics/taza');
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
                data: data.map(item => item.punteo_final),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    return (
        <div className='flex flex-row justify-between'>
            <div>
                {/* <h2>Doughnut Chart</h2> */}
                <Doughnut className='w-[450px]' data={chartData} />
            </div>
            <div>
                {/* <h2>Pie Chart</h2> */}
                <Pie className='w-[450px]' data={chartData} />
            </div>
        </div>
    );
};

export default TazaVariedadChart;
