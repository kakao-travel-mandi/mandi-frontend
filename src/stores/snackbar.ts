import { create } from 'zustand';

import { Snackbar } from '@/types/snackbar';

type SnackbarStoreType = {
  snackbars: Snackbar[];
  upsertSnackbar: (snackbar: Snackbar) => void;
  removeSnackbar: (id: string) => void;
};

export const useSnackbarStore = create<SnackbarStoreType>(set => ({
  snackbars: [],
  upsertSnackbar: snackbar =>
    set(state => {
      const index = state.snackbars.findIndex(item => item.id === snackbar.id);
      if (index > -1) {
        const newSnackbars = state.snackbars.map((item, i) =>
          i === index ? { ...item, ...snackbar } : item,
        );
        return { snackbars: newSnackbars };
      }
      return { snackbars: [...state.snackbars, snackbar] };
    }),
  removeSnackbar: id =>
    set(state => ({
      snackbars: state.snackbars.filter(s => s.id !== id),
    })),
}));