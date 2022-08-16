//react
import React from "react"
//additional functional
import { Routes, Route, Navigate } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE } from "./utils/consts"
import { publicRoutes, privateRoutes } from "./utils/routes"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "./firebase"
import Loading from "./components/UI/Loading/Loading"
//components

const AppRouter: React.FC = () => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return (
      <Routes>
        {publicRoutes.map(item => {
          return <Route key={item.path} path={item.path} element={<item.element />} />
        })}
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        {privateRoutes.map(item => {
          return <Route key={item.path} path={item.path} element={<item.element />} />
        })}
        <Route path="*" element={<Navigate to={MAIN_PAGE_ROUTE} />} />
      </Routes>
    )
  }
}

export default AppRouter
