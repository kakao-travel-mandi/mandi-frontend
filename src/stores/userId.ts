import { create } from 'zustand';

interface MyStore {
  userId: string | null;
  setUserId: (id: string) => void;
  resetUserId: () => void;
}

export const useMyIdStore = create<MyStore>(set => ({
  userId: null,
  setUserId: id => set({ userId: id }),
  resetUserId: () => set({ userId: null }),
}));
