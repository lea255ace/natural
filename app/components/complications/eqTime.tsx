import { Box } from '@chakra-ui/react';
import { useAstrolabeContext } from 'context/astrolabeProvider';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

function computeEquationOfTime(d: number) {
    const bRad = 2 * Math.PI * (d - 81) / 365;
    return 9.87 * Math.sin(2 * bRad) - 7.67 * Math.sin(bRad + 1.37);
}

export default function EqTime() {
    const astrolabe = useAstrolabeContext();
    
    const eqTimeRange = Array.from({length: 365}, (x, i) => i);
    const eqTimeData = eqTimeRange.map((x) => computeEquationOfTime(x));

    const currentDayOfYear = astrolabe.dayOfYear();
    const currentEqTime = computeEquationOfTime(currentDayOfYear);

    const axisColor = '#222222';
    const gridColor = '#CCCCCC';
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: false,
        scales: {
            x: {
                grid: {
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                    maxTicksLimit: 20,
                },
            },
            y: {
                grid: {
                    drawTicks: false,
                    color: [gridColor, gridColor, gridColor, gridColor, axisColor],
                },
                ticks: {
                    display: false,
                    maxTicksLimit: 10,
                },
                min: -20,
                max: 20,
            },
        },
    };
    const data = {
        labels: eqTimeRange,
        datasets: [
            {
                label: 'Dataset 1',
                order: 2,
                elements: {
                    line: {tension: 0.25},
                    point: {radius: 0, hitRadius: 0}
                },
                data: eqTimeData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                type: 'scatter',
                parsing: false,
                order: 1,
                elements: {
                    point: {radius: 5, hitRadius: 0}
                },
                data: [{x: currentDayOfYear, y: currentEqTime}],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <Box width='200px' height='200px'>
            <Line options={options} data={data} />
        </Box>
    );
}