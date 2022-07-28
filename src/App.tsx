// react
import React from "react"

// additional functional
// components
import SignUpPage from "./pages/SignUpPage/SignUpPage"
// styles
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="app">
      <SignUpPage />
    </div>
  )
}

export default App
