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
  weeklyResults: {
    'ПН': number,
    'ВТ': number,
    'СР': number,
    'ЧТ': number,
    'ПТ': number,
    'СБ': number,
    'НД': number,
  }
}
