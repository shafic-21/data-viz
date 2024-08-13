import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resakssData } from "@/constants";

const Header = () => {
  return (
    <div className="-z-10 w-full">
      <div>
        <h1 className="text-slate-100 font-bold text-3xl pb-4">
          ReSAKSS data viz
        </h1>

        <Select>
          <SelectTrigger className="py-2  w-fit  mb-4 rounded-full text-sm font-semibold text-green-600">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>

          <SelectContent>
            {resakssData.map((field) => (
              <SelectItem value={field.path}>{field.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
