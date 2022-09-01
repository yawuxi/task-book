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
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestoreDB } from "../../firebase";
import { doc } from "firebase/firestore";
import { WEEK_DAYS } from "../../utils/consts";
import { iTaskItem } from "../../types/TaskItem";
import { selectCurrentCategory } from "../../utils/selectCurrentCategory";
import dayjs from "dayjs";
// components
// styles
import './ProgressChart.scss'

// chart components registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// settings for chart
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    }
  },
};

const calcDateDiff = (dateCreated: string, dateFinished: string) => {
  const propCreated = dayjs(dateCreated)
  const propFinished = dayjs(dateFinished)

  return propFinished.diff(propCreated, 'day')
}

const ProgressChart: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  let chartData: Array<number> = [0, 0, 0, 0, 0, 0, 0];

  if (!userDataLoading) {
    selectCurrentCategory(userData!).tasksList.map((item: iTaskItem) => {
      if (calcDateDiff(item.dateCreated, item.dateFinished) < 7) {
        chartData[calcDateDiff(item.dateCreated, item.dateFinished)] += 1
      }
    })
  }

  return (
    <div className="progress-chart user-component">
      <h3 className="progress-chart__title h3-title">Графік успішності</h3>
      <div className="progress-chart__chart">
        <Line
          options={options}
          data={{
            labels: WEEK_DAYS,
            datasets: [
              {
                label: 'Виповнені задач',
                data: chartData,
                borderColor: '#29a19c',
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default ProgressChart
