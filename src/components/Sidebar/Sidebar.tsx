// react
import React, { useContext, useEffect, useRef } from "react"
// additional functional
import { TaskBookContext } from "../../shared/context"
import { Category } from "../../types/Category"
import { ACTION_TYPES } from "../../shared/actionTypes"
import { Link } from "react-router-dom"
import { doc } from "firebase/firestore"
import { signOutUser, firestoreDB, auth } from "../../firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
// components
import Loading from "../UI/Loading/Loading"
// styles
import './Sidebar.scss'
import logotype from '../../images/logotype.png'

const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const [user] = useAuthState(auth)
  const [userData, userDataLoading] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  // desctructuring
  const {
    modals: {
      modalTextWindow: { TOGGLE_TEXT_MODAL }
    },
    sidebar: { TOGGLE_BURGER_MENU },
    activePointOffset: { CHANGE_POINT_OFFSET }
  } = ACTION_TYPES

  const { sidebar: { burgerMenu } } = state

  // refs
  const topNavMenu = useRef<HTMLUListElement | null>(null)
  const navMenuElement = useRef<HTMLLIElement | null>(null)
  const sidebarActivePoint = useRef<HTMLLIElement | null>(null)

  // active point logic
  function positionActivePoint(e: any) {
    if (e.target !== e.currentTarget) {
      dispatch({ type: CHANGE_POINT_OFFSET, payload: e.target.offsetTop })
    }
  }

  // category-icon setting
  function setIconByTitle(title: string) {
    switch (title) {
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.25 6.75L9 1.5L15.75 6.75V15C15.75 15.3978 15.592 15.7794 15.3107 16.0607C15.0294 16.342 14.6478 16.5 14.25 16.5H3.75C3.35218 16.5 2.97064 16.342 2.68934 16.0607C2.40804 15.7794 2.25 15.3978 2.25 15V6.75Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.75 16.5V9H11.25V16.5" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'Дім':
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.25 6.75L9 1.5L15.75 6.75V15C15.75 15.3978 15.592 15.7794 15.3107 16.0607C15.0294 16.342 14.6478 16.5 14.25 16.5H3.75C3.35218 16.5 2.97064 16.342 2.68934 16.0607C2.40804 15.7794 2.25 15.3978 2.25 15V6.75Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.75 16.5V9H11.25V16.5" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "Сім'я":
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 15.75V14.25C12.75 13.4544 12.4339 12.6913 11.8713 12.1287C11.3087 11.5661 10.5456 11.25 9.75 11.25H3.75C2.95435 11.25 2.19129 11.5661 1.62868 12.1287C1.06607 12.6913 0.75 13.4544 0.75 14.25V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.75 8.25C8.40685 8.25 9.75 6.90685 9.75 5.25C9.75 3.59315 8.40685 2.25 6.75 2.25C5.09315 2.25 3.75 3.59315 3.75 5.25C3.75 6.90685 5.09315 8.25 6.75 8.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.25 15.75V14.25C17.2495 13.5853 17.0283 12.9396 16.621 12.4143C16.2138 11.8889 15.6436 11.5137 15 11.3475" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2.34753C12.6453 2.51276 13.2173 2.88806 13.6257 3.41427C14.0342 3.94047 14.2559 4.58766 14.2559 5.25378C14.2559 5.91991 14.0342 6.56709 13.6257 7.0933C13.2173 7.61951 12.6453 7.99481 12 8.16003" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'Робота':
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5.25H3C2.17157 5.25 1.5 5.92157 1.5 6.75V14.25C1.5 15.0784 2.17157 15.75 3 15.75H15C15.8284 15.75 16.5 15.0784 16.5 14.25V6.75C16.5 5.92157 15.8284 5.25 15 5.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15.75V3.75C12 3.35218 11.842 2.97064 11.5607 2.68934C11.2794 2.40804 10.8978 2.25 10.5 2.25H7.5C7.10218 2.25 6.72064 2.40804 6.43934 2.68934C6.15804 2.97064 6 3.35218 6 3.75V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'Спорт':
        return (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.75 1.5L2.25 10.5H9L8.25 16.5L15.75 7.5H9L9.75 1.5Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
    }
  }

  // conditional render
  const isBurgerMenuActive = burgerMenu ? 'sidebar shadow sidebar-burger-active' : 'sidebar shadow'

  // when burger menu open - scroll disabled
  useEffect(() => {
    burgerMenu ? document.body.classList.add('lock') : document.body.classList.remove('lock')
  }, [burgerMenu])

  return (
    <aside className={isBurgerMenuActive}>
      <div className="sidebar__logo">
        <img src={logotype} alt="logotype" />
      </div>
      <nav className="sidebar__top">
        <div className="sidebar__mobile-close button" onClick={() => dispatch({ type: TOGGLE_BURGER_MENU })}>Закрити меню</div>
        <h2 className="sidebar__title">Категорії</h2>
        <ul className="sidebar__list" ref={topNavMenu} onClick={positionActivePoint}>
          {
            userDataLoading ? <Loading />
              :
              userData?.pages.map((category: Category) => {
                return (
                  <li
                    key={category.title}
                    className="sidebar__item"
                    ref={navMenuElement}
                    onClick={() => dispatch({ type: TOGGLE_BURGER_MENU })}
                  >
                    <Link to={category.path}>
                      {setIconByTitle(category.title)}
                      {category.title}
                    </Link>
                  </li>
                )
              })
          }
          <li className="sidebar-active-point" ref={sidebarActivePoint} style={{ top: `${state.activePointOffset}px` }}></li>
        </ul>
        <button
          type="button"
          className="sidebar__category-add"
          onClick={() => dispatch({
            type: TOGGLE_TEXT_MODAL,
            payload: {
              placeholder: 'Додати категорію',
              submitFrom: 'sidebar',
            }
          })}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z" stroke="#29A19C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 6V12" stroke="#29A19C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 9H12" stroke="#29A19C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Додати
        </button>
      </nav>
      <nav className="sidebar__bottom">
        <h2 className="sidebar__title">Дані</h2>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <a href="#">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 15V7.5" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 15V3" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 15V10.5" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Статистика
            </a>
          </li>
          <li className="sidebar__item">
            <a href="#" >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.25 4.5L10.125 11.625L6.375 7.875L0.75 13.5" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.75 4.5H17.25V9" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Порвіняти
            </a>
          </li>
        </ul>
      </nav>
      <button className="sidebar__log-out" type="button" onClick={signOutUser}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.25 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 12.75L11.25 9L7.5 5.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.25 9H2.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Вийти
      </button>
    </aside>
  )
}

export default Sidebar
