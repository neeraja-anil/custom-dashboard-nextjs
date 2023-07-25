'use-client'

import React, { FC, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        // borderColor: string;
        backgroundColor: string[];
    }[];
}

// to add draggable classname to piechart
type props = {
    class: string
}

const PieChart: FC<props> = (props) => {
    const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: [] })
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Earnings $',
                    data: [11.365, 16.3872, 20.5567, 22.6799],
                    backgroundColor: ['#9bc2c4', '#667e9d', '#383e75', '#00004d']
                }
            ]
        })
    }, [])

    return (
        <>
            <div className={`${props.class} w-full md:col-span-1 relative flex items-center justify-center md:h-fit h-full m-auto p-4 border rounded-lg bg-white`}>
                <Pie data={chartData} options={chartOptions} width='100%' />
            </div>
        </>
    )
}

export default PieChart