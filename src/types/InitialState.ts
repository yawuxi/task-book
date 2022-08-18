import { iTaskItem } from '../types/TaskItem'
import { iTaskItemTemplate } from "../types/TaskItemTemplate";

export interface iInitialState {
  displayName: string,
  theme: string | null,
  taskList: Array<iTaskItem>,
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
