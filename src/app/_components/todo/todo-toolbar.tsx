import type React from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TodoToolbarProps = {
  isFilterd: boolean;
  searchData: string;
  onSearchChange: (value: string) => void;
  onResetFilters: () => void;
}

export const TodoToolbar = ({
  isFilterd, searchData,
  onSearchChange, onResetFilters,
}: TodoToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1 flex items-center gap-2 max-w-2xs">
        <Input 
          type="search"
          placeholder="Search todos..."
          value={searchData}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        />
        {/* Status */}
        <Button
          type="button"
          variant="outline"
        ></Button>
        <Button
          type="button"
          variant="outline"
        ></Button>
        { isFilterd &&
          <Button
            type="button"
            variant="ghost"
          >
            Reset
            <X />
          </Button>
        }
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
        >Add Todo</Button>
      </div>
    </div>
  );
};