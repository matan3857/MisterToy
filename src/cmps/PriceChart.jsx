import React from 'react';
import { Pie } from 'react-chartjs-2';

export const PriceChart = ({ pricesData }) => {

    const data = {
        labels: ['0$ ~ 25$', '26$ ~ 50$', '51$ ~ 75$', '76$ ~ 100$', '100$+'],
        datasets: [
            {
                label: '# of Votes',
                data: pricesData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data}
            width={400}
            height={400}
            options={{ maintainAspectRatio: false }
            }
        />
    )
};