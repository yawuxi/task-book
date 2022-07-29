// react
import React from "react"

// additional functional
import { Line } from 'react-chartjs-2'

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
// import faker from 'faker';
// components
// styles
import './ProgressChart.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const data = {
  labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
  datasets: [
    {
      label: '',
      data: [4, 2, 10, 1, 0, 5, 1],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const ProgressChart: React.FC = () => {
  return (
    <div className="progress-chart user-component">
      <h3 className="progress-chart__title h3-title">Графік успішності</h3>
      <div className="progress-chart__chart">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default ProgressChart
