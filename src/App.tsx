// react:
import React, { useEffect, useContext } from "react"
// additional functional
import { TaskBookContext } from "./shared/context"
import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth } from "./firebase"
import { ACTION_TYPES } from "./shared/actionTypes"
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import AppRouter from "./AppRouter"
import FirebaseConfig from "./firebase"
// modal imports
import CreateTask from "./components/UI/CreateTask/CreateTask"
import ModalTextWindow from "./components/UI/ModalTextWindow/ModalTextWindow"
// styles
import './App.scss'

const App: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const [user, loading] = useAuthState(auth)

  // destructuring
  const { modals: { createTask, modalTextWindow } } = state
  const { theme: { SET_THEME } } = ACTION_TYPES

  // settings theme to localStorage from state && settings default theme to light on first login on site
  useEffect(() => {
    dispatch({ type: SET_THEME, payload: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light' })
  }, [])

  const authenticationLoadingAppStyles = loading ? { height: '100vh' } : {}

  return (
    <div className="app" data-theme={state.theme} style={authenticationLoadingAppStyles}>
      <FirebaseConfig />
      {user ? (
        <>
          <Sidebar />
          <main className="main">
            <Header />
            <AppRouter />
            {/* modal */}
            {modalTextWindow.isOpen ? <ModalTextWindow /> : null}
            {createTask.isOpen ? <CreateTask /> : null}
          </main>
        </>
      ) : (
        <AppRouter />
      )}
    </div>
  )
}

export default App
