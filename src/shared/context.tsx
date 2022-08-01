
import { createContext, useReducer, ReactNode } from "react";
import { ACTION_TYPES } from "./actionTypes";
// import nextId from 'react-id-generator'

interface iInitialState {
  sidebar: {
    categories: Array<{ title: string }>
  },
  header: {
    toggleMenu: boolean,
  },
  modals: {
    sidebarAddCategory: { isOpen: boolean, },
  }
}

const initialState: iInitialState = {
  sidebar: {
    categories: [
      { title: 'Дім' },
      { title: "Сім'я" },
      { title: 'Робота' },
      { title: 'Спорт' },
    ]
  },
  header: {
    toggleMenu: false,
  },
  modals: {
    sidebarAddCategory: { isOpen: false, }
  }
}

export const TaskBookContext = createContext<any>(null)

export default interface iAction {
  type: string,
  payload?: any
}

const TaskBookReducer = (state: iInitialState, action: iAction) => {
  const { type, payload } = action
  const {
    sidebar: { SIDEBAR_ADD_CATEGORY },
    header: { TOGGLE_MENU },
    modals: { OPEN_SIDEBAR_ADD_CATEGORY, CLOSE_SIDEBAR_ADD_CATEGORY }
  } = ACTION_TYPES

  switch (type) {
    default:
      return state
    // sidebar
    case SIDEBAR_ADD_CATEGORY:
      return { ...state, sidebar: { categories: [...state.sidebar.categories, { title: payload }] } }
    case OPEN_SIDEBAR_ADD_CATEGORY:
      return { ...state, modals: { ...state.modals, sidebarAddCategory: { isOpen: true } } }
    case CLOSE_SIDEBAR_ADD_CATEGORY:
      return { ...state, modals: { ...state.modals, sidebarAddCategory: { isOpen: false } } }
    // header
    case TOGGLE_MENU:
      return { ...state, header: { toggleMenu: !state.header.toggleMenu } }
  }
}

export const TaskBookProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TaskBookReducer, initialState)

  return (
    <TaskBookContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskBookContext.Provider>
  )
}
