export const ACTION_TYPES = {
  theme: {
    SET_THEME: 'SET_THEME',
  },
  header: {
    TOGGLE_MENU: 'OPEN_TOGGLE_MENU',
  },
  sidebar: {
    TOGGLE_BURGER_MENU: 'TOGGLE_BURGER_MENU',
    ADD_REF_ELEMENT: 'ADD_REF_ELEMENT',
  },
  modals: {
    modalTextWindow: {
      TOGGLE_TEXT_MODAL: 'TOGGLE_MODAL',
      TEXT_MODAL_ADD: 'MODAL_ADD',
    },
    createTask: {
      TOGGLE_CREATE_TASK: 'TOGGLE_CREATE_TASK',
    }
  },
  taskItem: {
    COMPLETE_TASK: 'COMPLETE_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
  },
  taskItemTemplate: {
    ADD_TASK_TEMPLATE: 'ADD_TASK_TEMPLATE',
  },
  activePointOffset: {
    CHANGE_POINT_OFFSET: 'CHANGE_POINT_OFFSET',
  }
}
