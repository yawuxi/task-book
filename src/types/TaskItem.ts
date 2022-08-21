export interface iTaskItem {
  task: string,
  category?: string,
  dateFinish: string,
  dateCreated: string,
  priority?: string,
  id: string
  isCompleted: boolean
}
