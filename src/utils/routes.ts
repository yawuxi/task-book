import { LOGIN_ROUTE, MAIN_PAGE_ROUTE, USER_PAGE_ROUTE } from "./consts";
import { iRoute } from "../types/routes";
// components
import LoginPage from "../pages/AuthenticationPage/AuthenticationPage";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";

// public routes - routes which only unlogged users can reach
export const publicRoutes: Array<iRoute> = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage,
  },
]

// private routes - routes which only logged in users can reach
export const privateRoutes: Array<iRoute> = [
  {
    path: MAIN_PAGE_ROUTE,
    element: MainPage,
  },
  {
    path: USER_PAGE_ROUTE,
    element: UserPage,
  },
]
