import { create } from "zustand";


const useStore = create((set) => ({
  filePath: "/data/2024.xlsx",
  setFilePath: () => set((filePath) => ({ filePath: filePath})),
}));