// react
import React, { useEffect, useState } from "react"
// additional functional
import { iTaskItem } from "../../types/TaskItem";
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
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      grid: {
        color: '#F0F0F0',
      }
    },
    x: {
      grid: {
        color: '#F0F0F0',
      }
    }
  }
};

/**
 * TODO: feature: dynamic chart, depends of context data, firebase
 * TODO: change scales.y&&x.grid.color to #F0F0F0 when LIGHT theme, to #F9F9F9 when DARK theme
 * TODO: Wrap into React.memo, memoizate this component
*/

const ProgressChart: React.FC = () => {
  const [data, setData] = useState<Array<number>>([])
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

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
