// react:
import React, { useEffect, useContext } from "react"
// additional functional
import { TaskBookContext } from "./shared/context"
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
// modal imports
import CreateTask from "./components/UI/CreateTask/CreateTask"
// styles
import './App.scss'

/**
 * //TODO: feature: create context
 * //TODO: layout: UserPage
 * TODO: common: finish all todo`s
 */

const App: React.FC = () => {
  const { state } = useContext(TaskBookContext)
  // settings theme to localStorage from state
  useEffect(() => {
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  return (
    <div className="app" data-theme={state.theme}>
      <Sidebar />
      <main className="main">
        <Header />
        {/* modal */}
        <CreateTask />
      </main>
    </div>
  )
}

export default App
