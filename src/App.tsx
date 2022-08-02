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
import CreateTask from "./components/CreateTask/CreateTask"
import SidebarAddCategory from "./components/SidebarAddCategory/SidebarAddCategory"
// import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'

/**
 * //TODO: feature: create context
 * //TODO: layout: UserPage
 * TODO: common: finish all todo`s
 */

const App: React.FC = () => {
  return (
    <TaskBookProvider>
      <div className="app">
        <Sidebar />
        <main className="main">
          <Header />
          <MainPage />
          {/* <UserPage /> */}
          {/* modal */}
          <CreateTask />
        </main>
        <SidebarAddCategory />
      </div>
    </TaskBookProvider>
  )
}

export default App
