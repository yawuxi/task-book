import { iTaskItem } from "./TaskItem";

export interface iPage {
  title: string,
  path: string,
  createTaskCategories: Array<string>,
  createTaskPriorities: Array<string>,
  taskItemTemplates: [],
  tasksList: Array<iTaskItem>,
  tasksFinished: number,
  tasksRemoved: number,
}
