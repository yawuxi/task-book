// react
import React from "react"

// additional functional
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import WeeklyResults from "./components/WeeklyResults/WeeklyResults"
import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header />
        <div className="main__content">
          <WeeklyResults />
        </div>
        {/* <SignUpPage /> */}
      </main>
    </div>
  )
}

export default App
