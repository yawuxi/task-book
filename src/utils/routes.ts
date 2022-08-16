import { iRoutes } from "../types/routes";
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE, USER_PAGE_ROUTE } from "./consts";

// components
import LoginPage from "../pages/AuthenticationPage/AuthenticationPage";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";

export const publicRoutes: Array<iRoutes> = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage,
  },
]

// private routes - routes which only logged in users can reach
export const privateRoutes: Array<iRoutes> = [
  {
    path: MAIN_PAGE_ROUTE,
    element: MainPage,
  },
  {
    path: USER_PAGE_ROUTE,
    element: UserPage,
  },
]
