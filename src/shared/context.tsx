
import { createContext, useReducer, ReactNode } from "react";
import nextId from 'react-id-generator'

interface iInitialState {
  sidebar: {
    categories: Array<{ title: string }>
  }
}

interface iAction {
  type: string,
  payload: any
}

const initialState: iInitialState = {
  sidebar: {
    categories: [
      { title: 'Дім' },
      { title: "Сім'я" },
      { title: 'Робота' },
      { title: 'Спорт' },
    ]
  }
}

export const TaskBookContext = createContext<any>('')

const TaskBookReducer = (state: iInitialState, action: iAction) => {
  const { type, payload } = action

  switch (type) {
    default:
      return state
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
