// react
import React, { useEffect, useContext } from "react"
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
import { TaskBookContext } from "../../shared/context";
import { ACTION_TYPES } from "../../shared/actionTypes";
import { useAuthState } from "react-firebase-hooks/auth";
import { Category } from "../../types/Category";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestoreDB } from "../../firebase";
import { doc } from "firebase/firestore";
import { WEEK_DAYS } from "../../utils/consts";
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

const ProgressChart: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))
  const currentDayInDigit = dayjs().day()

  // destructuring
  const { weeklyResults: { UPDATE_WEEKLY_RESULTS } } = ACTION_TYPES

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
                data: state.weeklyResults,
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
