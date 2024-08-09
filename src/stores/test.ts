import { create } from "zustand";

import { BearType } from "@/types/test";

type BearStoreType = {
  bear: number;
  increaseBear: () => void;
};

export const useStore = create<BearStoreType>((set) => ({
  bear: 0,
  increaseBear: () => set((state) => ({ bear: state.bear + 1 })),
}));
