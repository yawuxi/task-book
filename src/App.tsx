// react:
import React, { useEffect, useContext } from "react"
// additional functional
import { TaskBookContext } from "./shared/context"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
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

/**
 * //TODO: feature: create context
 * //TODO: layout: UserPage
 * TODO: common: finish all todo`s
 */

const App: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)

  useEffect(() => {
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  return (
    <BrowserRouter>
      <div className="app" data-theme={state.theme}>
        <Sidebar />
        <main className="main">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user-page" element={<UserPage />} />
          </Routes>
          {/* modal */}
          <CreateTask />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
