import React, { FC, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

// to add draggable classname to Bar chart
type props = {
    class: string
}

const BarChart: FC<props> = (props) => {
    const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: [] })
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Sales $',
                    data: [39084, 35566, 40645, 32089, 30987, 45008],
                    borderColor: 'rgb(53,162,235)',
                    backgroundColor: 'rgb(53,162,235,0.4)'
                }
            ]
        })
    }, [])

    return (
        <>
            <div className={`${props.class} w-full md:col-span-1 relative md:h-fit h-full flex items-center p-4 border rounded-lg bg-white`}>
                {/* <div className={props.class}> */}
                <Bar data={chartData} options={chartOptions} />
                {/* </div> */}
            </div>
        </>
    )
}

export default BarChart