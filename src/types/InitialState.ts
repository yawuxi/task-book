export interface iInitialState {
  theme: string | null,
  sidebar: {
    burgerMenu: boolean,
  },
  header: {
    toggleMenu: boolean,
  },
  modals: {
    modalTextWindow: {
      isOpen: boolean,
      additionalData: object,
    },
    createTask: { isOpen: boolean },
  },
  userMethods: {
    signUp: () => void,
    signIn: () => void,
    signOut: () => void,
  },
  errors: {},
}
