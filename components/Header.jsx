"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resakssData } from "@/constants";
import { useYearListStore } from "@/store";
import { useFileStore } from "@/store";

const Header = () => {
  return (
    <header className="z-10 w-full bg-transparent">
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-slate-100 font-semibold text-lg pb-4">
              ReSAKSS Data Visualisation
            </h1>
            <span className="text-slate-200 text-xs">
              Based on{" "}
              <a
                href="https://www.resakss.org/"
                className="underline text-green-500 italic"
              >
                Resakss.org
              </a>{" "}
              data
            </span>
          </div>
          <div className="flex w-full items-center justify-between h-fit">
            <FieldSelectTab />
            <div className="flex gap-4 text-slate-400 h-full items-center">
              <p className="text-sm font-semibold  h-10">Change Year</p>
              <YearSelectTab />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const FieldSelectTab = () => {
  const { updateFilePath, filePath } = useFileStore();

  return (
    <Select
      defaultValue={filePath}
      onValueChange={(value) => {
        updateFilePath(value);
      }}
    >
      <SelectTrigger className=" w-fit mb-4 rounded-fulltext-xs font-semibold bg-green-600/10 text-green-600 border-none">
        <SelectValue placeholder="Select field" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-none text-slate-500">
        {Object.entries(resakssData).map(([group, fields]) => (
          <SelectGroup key={group}>
            <SelectLabel className="text-sm">{group}</SelectLabel>
            {fields.map((field) => (
              <SelectItem
                key={field.path}
                value={field.path}
                className="focus:bg-green-600/10 text-xs focus:text-green-800"
              >
                {field.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

const YearSelectTab = () => {
  const { activeYear, yearList, setActiveYear } = useYearListStore();

  return (
    <Select
      value={activeYear}
      onValueChange={(value) => {
        setActiveYear(Number(value));
      }}
    >
      <SelectTrigger className=" w-fit mb-4 rounded-fulltext-xs font-semibold bg-red-600/10 text-red-600 border-none">
        <SelectValue placeholder="Select field" />
        {/* <SelectIcon/> */}
      </SelectTrigger>
      <SelectContent className="bg-slate-800 min-w-0  border-none text-slate-500">
        {yearList.map((year) => (
          <SelectItem
            key={year}
            value={year}
            className="focus:bg-red-600/10 w-20 text-xs text-slate-500 focus:text-red-800"
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
