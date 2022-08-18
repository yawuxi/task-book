import { iTaskItem } from '../types/TaskItem'
import { iTaskItemTemplate } from "../types/TaskItemTemplate";

export interface iInitialState {
  displayName: string,
  theme: string | null,
  tasksList: Array<iTaskItem>,
  taskItemTemplates: Array<iTaskItemTemplate>,
  createTaskPriorities: Array<string>,
  createTaskCategories: Array<string>,
  sidebar: {
    categories: Array<{ title: string, path: string }>,
    burgerMenu: boolean,
  },
  header: {
    toggleMenu: boolean,
  },
  modals: {
    modalTextWindow: { isOpen: boolean, },
    createTask: { isOpen: boolean },
  },
}
