// react
import React from "react"

// additional functional
// components
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import Sidebar from "./components/Sidebar/Sidebar"
// styles
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <main>
        {/* <SignUpPage /> */}
      </main>
    </div>
  )
}

export default App
