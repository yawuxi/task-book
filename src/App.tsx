// react
import React from "react"
// additional functional
import { TaskBookProvider } from "./shared/context"
// components
import Sidebar from "./components/Sidebar/Sidebar"
import MainPage from "./pages/MainPage/MainPage"
// import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'

/**
 * TODO: create context
 * TODO: Sidebar navigation items from context
 */

const App: React.FC = () => {
  return (
    <TaskBookProvider>
      <div className="app">
        <Sidebar />
        <main className="main">
          <MainPage />
        </main>
      </div>
    </TaskBookProvider>
  )
}

export default App
