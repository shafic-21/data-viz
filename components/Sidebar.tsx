import { regionColors } from "@/constants";
import DynamicLineGraph from "./DynamicLineGraph";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-fit flex-shrink-0 p-4 w-fit overflow-hidden bg-slate-900 rounded-md">
      <div className="flex flex-col space-y-2">
        <h2 className="text-slate-200 font-normal">
          Legend
        </h2>
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} className="flex items-center space-x-2">
            <div className={cn("w-6 h-4 rounded-md",)} style={{backgroundColor:color}}/>
            <span className="text-base text-slate-400">{region}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
