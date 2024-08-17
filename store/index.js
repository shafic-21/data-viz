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
  compareMode: false,
  compareData: [],
  updateActiveData: (activeData) => set((state) => ({ activeData })),
  addCompareData: (newData) =>
    set((state) => ({
      compareData: [...state.compareData, newData],
    })),
  removeCompareData: (name) =>
    set((state) => ({
      compareData: state.compareData.filter((data) => data !== name),
    })),
  toggleCompareMode: () =>
    set((state) => ({ compareMode: !state.compareMode })),
}));
