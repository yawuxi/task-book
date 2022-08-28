// react
import React from "react"
// additional functional
// components
import WeeklyResults from "../../components/WeeklyResults/WeeklyResults"
import TaskList from "../../components/TasksList/TasksList"
import TodayInfo from "../../components/TodayInfo/TodayInfo"
import TodayFact from "../../components/TodayFact/TodayFact"
import ProgressChart from "../../components/ProgressChart/ProgressChart"
// styles
import './MainPage.scss'

const MainPage: React.FC = () => {
  return (
    <>
      <div className="main__content">
        <div className="main__left">
          {/* <WeeklyResults /> */}
          <TaskList />
        </div>
        <div className="main__right">
          <TodayInfo />
          <TodayFact />
          <ProgressChart />
        </div>
      </div>
    </>
  )
}

export default MainPage
