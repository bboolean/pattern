import { create } from 'zustand';

const defaultForm = {
  shape: 'Plus',
  background: 'Dark',
  hue: 0,
  brightness: 50,
};

export const useStore = create((set) => ({
  modals: {},
  form: defaultForm,
  list: {},
  nextIndex: 0,
  phone: false,
  togglePhone: () =>
    set((state) => ({
      phone: !state.phone,
    })),
  update: (category, name, value) =>
    set((state) => ({
      [category]: {
        ...state?.[category],
        [name]: value,
      },
    })),
  newForm: () =>
    set((state) => ({
      form: {
        ...defaultForm,
        name: 'Picture ' + (state.nextIndex + 1),
      },
      modals: {
        ...state.modals,
        editBox: true,
      },
    })),
  save: () =>
    set((state) => {
      if (undefined !== state.form.id) {
        return {
          list: {
            ...state.list,
            [state.form.id]: {
              ...state.form,
              name:
                state.form.name ||
                'Picture ' + (state.form.id + 1),
              image: document
                .getElementById('canvas')
                .toDataURL(),
            },
          },
          modals: {
            ...state.modals,
            editBox: false,
          },
        };
      } else {
        return {
          list: {
            ...state.list,
            [state.nextIndex]: {
              ...state.form,
              id: state.nextIndex,
              image: document
                .getElementById('canvas')
                .toDataURL(),
            },
          },
          nextIndex: 1 + state.nextIndex,
          modals: {
            ...state.modals,
            editBox: false,
          },
        };
      }
    }),
  open: (item) =>
    set((state) => ({
      form: item,
      modals: {
        ...state.modals,
        editBox: true,
      },
    })),
}));
