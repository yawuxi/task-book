
import { createContext, useReducer, ReactNode, useEffect } from "react";
import { ACTION_TYPES } from "./actionTypes";
import { iTaskItem } from '../types/TaskItem'
import { iTaskItemTemplate } from "../types/TaskItemTemplate";
import nextId from 'react-id-generator'

interface iInitialState {
  sidebar: {
    categories: Array<{ title: string }>
  },
  header: {
    toggleMenu: boolean,
  },
  modals: {
    modalTextWindow: { isOpen: boolean, },
    createTask: { isOpen: boolean },
  },
  taskList: Array<iTaskItem>,
  taskItemTemplate: Array<iTaskItemTemplate>,
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
    modalTextWindow: { isOpen: false, },
    createTask: { isOpen: false, },
  },
  taskList: [
    { task: 'Зробити блінчики', category: 'їжа', date: '2020-08-01', priority: 'Дуже важливо', id: nextId(), isCompleted: false },
    { task: 'Купити квіточкі мамі', category: "сім'я", date: '2020-08-01', priority: 'Дуже важливо', id: nextId(), isCompleted: false },
    { task: 'Купити татові авто', category: 'мрія', date: '2020-08-01', priority: 'Дуже важливо', id: nextId(), isCompleted: false },
    { task: 'Купити поїсти', category: 'їжа', date: '2020-08-01', priority: 'Дуже важливо', id: nextId(), isCompleted: true },
  ],
  taskItemTemplate: []
}

export const TaskBookContext = createContext<any>(null)

export default interface iAction {
  type: string,
  payload?: any
}

const TaskBookReducer = (state: iInitialState, action: iAction) => {
  const { type, payload } = action
  const {
    header: { TOGGLE_MENU },
    modals: {
      modalTextWindow: { TOGGLE_TEXT_MODAL, TEXT_MODAL_ADD },
      createTask: { TOGGLE_CREATE_TASK, ADD_TASK },
    },
    taskItem: { COMPLETE_TASK, REMOVE_TASK },
    taskItemTemplate: { ADD_TASK_TEMPLATE }
  } = ACTION_TYPES

  switch (type) {
    default:
      return state
    // sidebar
    case TOGGLE_TEXT_MODAL:
      return { ...state, modals: { ...state.modals, modalTextWindow: { isOpen: !state.modals.modalTextWindow.isOpen } } }
    case TEXT_MODAL_ADD:
      return { ...state, sidebar: { categories: [...state.sidebar.categories, { title: payload }] } }
    // header
    case TOGGLE_MENU:
      return { ...state, header: { toggleMenu: !state.header.toggleMenu } }
    // CreateTask
    case TOGGLE_CREATE_TASK:
      return { ...state, modals: { ...state.modals, createTask: { isOpen: !state.modals.createTask.isOpen } } }
    case ADD_TASK:
      return {
        ...state,
        taskList: [
          ...state.taskList,
          { task: payload.task, category: payload.category, date: payload.date, priority: payload.priority, id: nextId(), isCompleted: false, }
        ]
      }
    // TaskItem
    case COMPLETE_TASK:
      return {
        ...state,
        taskList: state.taskList.map(item => {
          if (item.id !== payload) return item

          return { ...item, isCompleted: !item.isCompleted }
        })
      }
    case REMOVE_TASK:
      return {
        ...state,
        taskList: state.taskList.filter(item => item.id !== payload)
      }
    // taskItemTemplate
    case ADD_TASK_TEMPLATE: {
      return {
        ...state,
        taskItemTemplate: [...state.taskItemTemplate, payload]
      }
    }
  }
}

export const TaskBookProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TaskBookReducer, initialState)

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <TaskBookContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskBookContext.Provider>
  )
}
