import DynamicLineGraph from "./DynamicLineGraph";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full flex-grow-0 max-w-[400px] overflow-hidden bg-slate-900 rounded-2xl">
      <DynamicLineGraph />
    </div>
  );
};

export default Sidebar;
