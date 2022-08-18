import { createContext, useReducer, ReactNode, useEffect } from "react";
import { ACTION_TYPES } from "./actionTypes";
import { iInitialState } from "../types/InitialState";
import { iAction } from "../types/Action";

const initialState: iInitialState = {
  displayName: '',
  theme: localStorage.getItem('theme'),
  taskList: [
    // {
    //   task: 'Зробити блінчики',
    //   category: 'їжа',
    //   date: '2020-08-01',
    //   priority: 'Дуже важливо',
    //   id: nextId(),
    //   isCompleted: false
    // },
  ],
  taskItemTemplates: [],
  createTaskPriorities: [],
  createTaskCategories: [],
  sidebar: {
    categories: [
      { title: 'Дім', path: '/' },
      { title: "Сім'я", path: '/family' },
      { title: 'Робота', path: '/work' },
      { title: 'Спорт', path: '/sport' },
    ],
    burgerMenu: false,
  },
  header: {
    toggleMenu: false,
  },
  modals: {
    modalTextWindow: { isOpen: false, },
    createTask: { isOpen: false, },
  },
}

export const TaskBookContext = createContext<any>(null)

const TaskBookReducer = (state: iInitialState, action: iAction) => {
  const { type, payload } = action

  const {
    theme: { SET_THEME },
    header: { TOGGLE_MENU },
    sidebar: {
      TOGGLE_BURGER_MENU,
    },
    modals: {
      modalTextWindow: {
        TOGGLE_TEXT_MODAL,
        TEXT_MODAL_ADD,
      },
      createTask: { TOGGLE_CREATE_TASK, },
    },
    taskItem: { COMPLETE_TASK, REMOVE_TASK },
    taskItemTemplate: { ADD_TASK_TEMPLATE },
    activePointOffset: { CHANGE_POINT_OFFSET },
  } = ACTION_TYPES

  const {
    taskList,
    modals,
    sidebar,
  } = state

  switch (type) {
    default:
      return state
    // theme
    case SET_THEME:
      return { ...state, theme: payload }
    // sidebar
    case TOGGLE_TEXT_MODAL:
      return { ...state, modals: { ...modals, modalTextWindow: { isOpen: !modals.modalTextWindow.isOpen } } }
    case TOGGLE_BURGER_MENU:
      return { ...state, sidebar: { ...sidebar, burgerMenu: !sidebar.burgerMenu } }
    case TEXT_MODAL_ADD:
      return { ...state, sidebar: { ...sidebar, categories: [...sidebar.categories, { title: payload.title, path: payload.path }] } }
    // header
    case TOGGLE_MENU:
      return { ...state, header: { toggleMenu: !state.header.toggleMenu } }
    // CreateTask
    case TOGGLE_CREATE_TASK:
      return { ...state, modals: { ...modals, createTask: { isOpen: !modals.createTask.isOpen } } }
    // TaskItem
    case COMPLETE_TASK:
      return {
        ...state,
        taskList: taskList.map(item => {
          if (item.id !== payload) return item

          return { ...item, isCompleted: !item.isCompleted }
        })
      }
    case REMOVE_TASK:
      return {
        ...state,
        taskList: taskList.filter(item => item.id !== payload)
      }
    // taskItemTemplate
    case ADD_TASK_TEMPLATE:
      return {
        ...state,
        taskItemTemplates: [...state.taskItemTemplates, payload]
      }
    // activePointOffset
    case CHANGE_POINT_OFFSET:
      return { ...state, activePointOffset: payload }
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
