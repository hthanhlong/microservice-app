import { TextInput } from "flowbite-react";
import { SearchIcon } from "@/components/ui/icons";

export default function Search() {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="text-textSecondary text-sm">
        1 ~ 6 of over 100 results
      </div>
      <div>
        <form>
          <TextInput placeholder="Search" className="w-96" icon={SearchIcon} />
        </form>
      </div>
    </div>
  );
}
