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
import { useFileStore } from "@/store";

const defaultValue =
  "/data/resakss/agricultural-transformation-and-growth/agriculture-value-added-per-worker-(constant-2015-USD).xlsx";

const Header = () => {
  return (
    <header className="-z-10 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-slate-100 font-semibold text-lg pb-4">
            ReSAKSS data visualisation
          </h1>
          <SelectTab />
        </div>
      </div>
    </header>
  );
};

export default Header;

const SelectTab = () => {
  const updateFilePath = useFileStore((state) => state.updateFilePath);

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        updateFilePath(value);
      }}
    >
      <SelectTrigger className=" w-fit mb-4 rounded-fulltext-xs font-semibold bg-green-600/10 text-green-600 border-none">
        <SelectValue placeholder="Select field" />
        {/* <SelectIcon/> */}
      </SelectTrigger>
      <SelectContent className="bg-green-600/5 border-none text-slate-500">
        {Object.entries(resakssData).map(([group, fields]) => (
          <SelectGroup key={group}>
            <SelectLabel className="text-sm">{group}</SelectLabel>
            {fields.map((field) => (
              <SelectItem
                key={field.path}
                value={field.path}
                className="focus:bg-green-600/10 text-xs focus:text-slate-500"
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
