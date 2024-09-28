import { create } from 'zustand';

// TODO: 임시구조
type User = {
  id: string;
  email: string;
  // nickname: string;
  // avatar: string;
  // role: 'admin' | 'user';
};

type UserStoreType = {
  user: User;
  setUser: (user: User) => void;
};

const initialUser: User = {
  id: '1',
  email: 'Lola',
};

export const useUserStore = create<UserStoreType>(set => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
}));
