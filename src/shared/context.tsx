
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
    addCategory: { isOpen: boolean, },
    createTask: { isOpen: boolean },
  },
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
    addCategory: { isOpen: false, },
    createTask: { isOpen: false },
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
    modals: { TOGGLE_ADD_CATEGORY, TOGGLE_CREATE_TASK, }
  } = ACTION_TYPES

  switch (type) {
    default:
      return state
    // sidebar
    case SIDEBAR_ADD_CATEGORY:
      return { ...state, sidebar: { categories: [...state.sidebar.categories, { title: payload }] } }
    case TOGGLE_ADD_CATEGORY:
      return { ...state, modals: { ...state.modals, addCategory: { isOpen: !state.modals.addCategory.isOpen } } }
    // header
    case TOGGLE_MENU:
      return { ...state, header: { toggleMenu: !state.header.toggleMenu } }
    // new task
    case TOGGLE_CREATE_TASK:
      return {
        ...state, modals: { ...state.modals, createTask: { isOpen: !state.modals.createTask.isOpen } }
      }

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
