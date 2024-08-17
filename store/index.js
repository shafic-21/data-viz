import { create } from "zustand";

export const useFileStore = create((set) => ({
  filePath:
    "/data/resakss/economic-growth-and-inclusive-development/employment-rate-of-population-15-years.xlsx",
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
      };
    }),
  setActiveYear: (year) => set({ activeYear: year }),
}));

export const useChartDataStore = create((set) => ({
  activeData: "Africa wide",
  updateActiveData: (activeData) => set((state) => ({ activeData })),
}));
