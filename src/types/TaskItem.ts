export interface iTaskItem {
  task: string,
  category?: string,
  dateWillFinish: string,
  dateCreated: string,
  dateFinished: string,
  priority?: string,
  id: string
  isCompleted: boolean
}
