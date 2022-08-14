export const ACTION_TYPES = {
  theme: {
    SET_THEME: 'SET_THEME',
  },
  header: {
    TOGGLE_MENU: 'OPEN_TOGGLE_MENU',
  },
  sidebar: {
    TOGGLE_BURGER_MENU: 'TOGGLE_BURGER_MENU',
  },
  modals: {
    modalTextWindow: {
      TOGGLE_TEXT_MODAL: 'TOGGLE_MODAL',
      TEXT_MODAL_ADD: 'MODAL_ADD',
    },
    createTask: {
      TOGGLE_CREATE_TASK: 'TOGGLE_CREATE_TASK',
      ADD_TASK: 'ADD_TASK',
    }
  },
  taskItem: {
    COMPLETE_TASK: 'COMPLETE_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
  },
  taskItemTemplate: {
    ADD_TASK_TEMPLATE: 'ADD_TASK_TEMPLATE',
  },
}
