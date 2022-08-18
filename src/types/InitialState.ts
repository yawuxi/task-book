export interface iInitialState {
  theme: string | null,
  sidebar: {
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
