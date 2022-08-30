import { createContext, useReducer, ReactNode } from "react";
import { ACTION_TYPES } from "./actionTypes";
import { iInitialState } from "../types/InitialState";
import { iAction } from "../types/Action";

const initialState: iInitialState = {
  theme: localStorage.getItem('theme'),
  sidebar: {
    burgerMenu: false,
  },
  header: {
    toggleMenu: false,
  },
  modals: {
    modalTextWindow: {
      isOpen: false,
      additionalData: {},
    },
    createTask: { isOpen: false, },
  },
  userMethods: {
    signUp: () => { },
    signIn: () => { },
    signOut: () => { },
  },
  errors: {},
}

export const TaskBookContext = createContext<any>(null)

const TaskBookReducer = (state: iInitialState, action: iAction) => {
  // destructuring
  const { type, payload } = action

  const {
    theme: { SET_THEME, },
    header: { TOGGLE_MENU, },
    sidebar: {
      TOGGLE_BURGER_MENU,
      CLOSE_BURGER_MENU,
    },
    modals: {
      modalTextWindow: {
        TOGGLE_TEXT_MODAL,
      },
      createTask: { TOGGLE_CREATE_TASK, },
    },
    activePointOffset: { CHANGE_POINT_OFFSET, },
    userMethods: {
      SET_SIGN_IN,
      SET_SIGN_UP,
      SET_SIGN_OUT
    },
    errors: { SET_ERROR, },
  } = ACTION_TYPES

  const {
    modals,
    sidebar,
    modals: {
      modalTextWindow,
      createTask,
    }
  } = state

  switch (type) {
    default:
      return state
    // theme
    case SET_THEME:
      return { ...state, theme: payload }
    // modals
    case TOGGLE_TEXT_MODAL:
      return {
        ...state, modals: {
          ...modals,
          modalTextWindow: {
            isOpen: !modalTextWindow.isOpen,
            additionalData: payload
          }
        }
      }
    case TOGGLE_CREATE_TASK:
      return { ...state, modals: { ...modals, createTask: { isOpen: !createTask.isOpen } } }
    // menus
    case TOGGLE_BURGER_MENU:
      return { ...state, sidebar: { ...sidebar, burgerMenu: !sidebar.burgerMenu } }
    case CLOSE_BURGER_MENU:
      return { ...state, sidebar: { ...sidebar, burgerMenu: false } }
    case TOGGLE_MENU:
      return { ...state, header: { toggleMenu: !state.header.toggleMenu } }
    // active point offset
    case CHANGE_POINT_OFFSET:
      return { ...state, activePointOffset: payload }
    // methods
    case SET_SIGN_IN:
      return { ...state, userMethods: { ...state.userMethods, signIn: payload } }
    case SET_SIGN_UP:
      return { ...state, userMethods: { ...state.userMethods, signUp: payload } }
    case SET_SIGN_OUT:
      return { ...state, userMethods: { ...state.userMethods, signOut: payload } }
    // errors
    case SET_ERROR:
      return { ...state, errors: { err: payload } }
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
