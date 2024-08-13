import { create } from "zustand";


export const useFileStore = create((set) => ({
  filePath:
    "/data/resakss/agricultural-transformation-and-growth/agriculture-value-added-per-worker-(constant-2015-USD).xlsx",
  updateFilePath: (filePath) => set(() => ({ filePath })),
}));