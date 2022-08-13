// react
import React from "react"
// additional functional
import { TaskBookProvider } from "./shared/context"
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import MainPage from "./pages/MainPage/MainPage"
import UserPage from "./pages/UserPage/UserPage"
// modal imports
import CreateTask from "./components/UI/CreateTask/CreateTask"
// import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'
import ModalTextWindow from "./components/UI/ModalTextWindow/ModalTextWindow"

/**
 * //TODO: feature: create context
 * //TODO: layout: UserPage
 * TODO: common: finish all todo`s
 */

const App: React.FC = () => {
  return (
    <TaskBookProvider>
      <div className="app" data-theme="">
        <Sidebar />
        <main className="main">
          <Header />
          <MainPage />
          {/* <UserPage /> */}
          {/* modal */}
          <CreateTask />
        </main>
      </div>
    </TaskBookProvider>
  )
}

export default App
