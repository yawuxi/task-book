//additional functional
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from "react-firebase-hooks/firestore"
import { auth, firestoreDB } from "./firebase"
import { doc } from "firebase/firestore"
import { Category } from "./types/Category"
import { AUTHENTICATION_ROUTE, MAIN_PAGE_ROUTE, USER_PAGE_ROUTE } from "./utils/consts"
import { Navigate, Route, Routes } from "react-router-dom"
//components
import MainPage from "./pages/MainPage/MainPage"
import UserPage from './pages/UserPage/UserPage'
import Loading from "./components/UI/Loading/Loading"
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage"

const AppRouter: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user ? user!.uid : 'null'))

  if (loading) {
    return <Loading />
  }

  if (user) {
    return (
      <Routes>
        {userData?.pages.map((item: Category) => {
          return <Route key={item.path} path={item.path} element={<MainPage />} />
        })}
        <Route path={USER_PAGE_ROUTE} element={<UserPage />} />
        {userData && <Route path="*" element={<Navigate to={MAIN_PAGE_ROUTE} />} />}
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path={AUTHENTICATION_ROUTE} element={<AuthenticationPage />} />
        <Route path="*" element={<Navigate to={AUTHENTICATION_ROUTE} />} />
      </Routes>
    )
  }
}
export default AppRouter
