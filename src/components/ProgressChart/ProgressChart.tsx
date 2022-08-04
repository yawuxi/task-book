// react
import React, { useContext, useEffect, useState } from "react"

// additional functional
import { TaskBookContext } from "../../shared/context";
import { iTaskItem } from "../TaskItem/TaskItem";
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

/**
 * TODO: feature: dynamic chart, depends of context data, firebase
*/

const ProgressChart: React.FC = () => {
  const [data, setDate] = useState<Array<number>>([])
  const { state } = useContext(TaskBookContext)
  const { taskList } = state

  useEffect(() => {
    setDate(state => [...state, taskList.filter((task: iTaskItem) => task.isCompleted).length])
  }, [taskList])

  return (
    <div className="progress-chart user-component">
      <h3 className="progress-chart__title h3-title">Графік успішності</h3>
      <div className="progress-chart__chart">
        <Line
          options={options}
          data={{
            labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
            datasets: [
              {
                label: '',
                data,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }} />
      </div>
    </div>
  )
}

export default ProgressChart
