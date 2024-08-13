import { countryList, regionColors } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-3/4 flex-shrink-0 p-4 w-fit overflow-hidden bg-slate-900 rounded-md">
      <div className="flex h-full flex-col space-y-2">
        <h2 className="text-slate-200 font-normal">Legend</h2>
        <ScrollArea className="h-[100%]">
          {" "}
          {Object.entries(regionColors).map(([region, color]) => (
            <div key={region} className="flex items-center space-x-2">
              <div
                className={cn("w-4 h-4 rounded-md")}
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-slate-400">{region}</span>
            </div>
          ))}
          {countryList.map(({ name, code }) => (
            <div key={name} className="flex items-center space-x-2">
              <img
                className={cn("w-4 h-4 rounded-md")}
                src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
              />
              <span className="text-sm text-slate-400">{name}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
