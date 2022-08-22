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
  weeklyResults: {
    'ПН': 0,
    'ВТ': 0,
    'СР': 0,
    'ЧТ': 0,
    'ПТ': 0,
    'СБ': 0,
    'НД': 0,
  },
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
    },
    modals: {
      modalTextWindow: {
        TOGGLE_TEXT_MODAL,
      },
      createTask: { TOGGLE_CREATE_TASK, },
    },
    activePointOffset: { CHANGE_POINT_OFFSET, },
    weeklyResults: { UPDATE_WEEKLY_RESULTS, },
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
    case TOGGLE_MENU:
      return { ...state, header: { toggleMenu: !state.header.toggleMenu } }
    // active point offset
    case CHANGE_POINT_OFFSET:
      return { ...state, activePointOffset: payload }
    // weekly results
    case UPDATE_WEEKLY_RESULTS:
      const calcDayName = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'][payload.day - 1]
      return { ...state, weeklyResults: { ...state.weeklyResults, [calcDayName]: payload.value } }
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
