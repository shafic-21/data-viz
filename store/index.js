import { create } from "zustand";

export const useFileStore = create((set) => ({
  filePath:
    "/data/resakss/agricultural-transformation-and-growth/agriculture-value-added-per-worker-constant-2015-USD.xlsx",
  updateFilePath: (filePath) => set(() => ({ filePath })),
}));

export const useYearListStore = create((set) => ({
  activeYear: null,
  yearList: [],
  updateYearList: (yearList) =>
    set((state) => {
      const sortedList = [...yearList].sort((a, b) => b - a);
      return {
        yearList: sortedList,
        activeYear: state.activeYear || sortedList[0] || null,
      };
    }),
  setActiveYear: (year) => set({ activeYear: year }),
}));

export const useChartDataStore = create((set) => ({
  activeData: "Africa wide",
  updateActiveData: (activeData) => set((state) => ({ activeData })),
}));
