// react
import React from "react"

// additional functional
// components
import Sidebar from "./components/Sidebar/Sidebar"
import MainPage from "./pages/MainPage/MainPage"
// import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <MainPage />
      </main>
    </div>
  )
}

export default App
