// react
import React from "react"

// additional functional
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import WeeklyResults from "./components/WeeklyResults/WeeklyResults"
import TaskList from "./components/TaskList/TaskList"
// import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'

/**
 * TODO: max-width: 768.99px Sidebar component transform to the burger menu
 */

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header />
        <div className="main__content">
          <div className="main__left">
            <WeeklyResults />
            <TaskList />
          </div>
        </div>
        {/* <SignUpPage /> */}
      </main>
    </div>
  )
}

export default App
