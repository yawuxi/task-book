// react
import React from "react"

// additional functional
// components
import Header from "../../components/Header/Header"
import WeeklyResults from "../../components/WeeklyResults/WeeklyResults"
import TaskList from "../../components/TaskList/TaskList"
import TodayInfo from "../../components/TodayInfo/TodayInfo"
import TodayFact from "../../components/TodayFact/TodayFact"
import ProgressChart from "../../components/ProgressChart/ProgressChart"
// styles
import './MainPage.scss'

const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main__content">
        <div className="main__left">
          <WeeklyResults />
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
