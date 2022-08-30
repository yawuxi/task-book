export const ACTION_TYPES = {
  theme: {
    SET_THEME: 'SET_THEME',
  },
  header: {
    TOGGLE_MENU: 'OPEN_TOGGLE_MENU',
  },
  sidebar: {
    TOGGLE_BURGER_MENU: 'TOGGLE_BURGER_MENU',
    CLOSE_BURGER_MENU: 'CLOSE_BURGER_MENU',
  },
  modals: {
    modalTextWindow: {
      TOGGLE_TEXT_MODAL: 'TOGGLE_MODAL',
    },
    createTask: {
      TOGGLE_CREATE_TASK: 'TOGGLE_CREATE_TASK',
    }
  },
  activePointOffset: {
    CHANGE_POINT_OFFSET: 'CHANGE_POINT_OFFSET',
  },
  userMethods: {
    SET_SIGN_UP: 'SET_SIGN_UP',
    SET_SIGN_IN: 'SET_SIGN_IN',
    SET_SIGN_OUT: 'SET_SIGN_OUT',
  },
  errors: {
    SET_ERROR: 'SET_ERROR',
  },
}
