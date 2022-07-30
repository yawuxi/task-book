
import { createContext, useReducer, ReactNode } from "react";

interface iInitialState {
  testStr: string,
  testStr1: string,
}

interface iAction {
  type: string,
  payload: any
}

const initialState: iInitialState = {
  testStr: '',
  testStr1: '',
}

export const TaskBookContext = createContext<any>('')

const TaskBookReducer = (state: iInitialState, action: iAction) => {
  const { type, payload } = action

  switch (type) {
    default:
      return state
    case 'test':
      return { ...state, testStr: payload }
    case 'test1':
      return { ...state, testStr1: payload }
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
