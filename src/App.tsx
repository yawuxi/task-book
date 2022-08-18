// react:
import React, { useEffect, useContext, useState } from "react"
// additional functional
import { TaskBookContext } from "./shared/context"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "./firebase"
import { ACTION_TYPES } from "./shared/actionTypes"
import { getDataFromFirestoreDB } from './firebase'
// components
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import AppRouter from "./AppRouter"
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
  const { state, dispatch } = useContext(TaskBookContext)
  const [user, loading] = useAuthState(auth)
  const { LOAD_DATA_FROM_FIREBASE } = ACTION_TYPES

  useEffect(() => {
    if (user) {
      getDataFromFirestoreDB(user).then(userData => dispatch({ type: LOAD_DATA_FROM_FIREBASE, payload: userData }))
    }
  }, [user])

  // destructuring
  const { modals: { createTask: { isOpen } } } = state

  // settings theme to localStorage from state
  useEffect(() => {
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  // when authentication loading styles
  const authenticationLoadingAppStyles = loading ? { height: '100vh' } : {}

  return (
    <div className="app" data-theme={state.theme} style={authenticationLoadingAppStyles}>
      {user ? (
        <>
          <Sidebar />
          <main className="main">
            <Header />
            <AppRouter />
            {/* modal */}
            {isOpen ? <CreateTask /> : null}
          </main>
        </>
      ) : (
        <AppRouter />
      )}
    </div>
  )
}

export default App
