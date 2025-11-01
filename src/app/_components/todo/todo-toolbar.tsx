import type React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TodoToolbarProps = {
  searchData: string;
  onSearchChange: (value: string) => void;
}

export const TodoToolbar = ({
  searchData,
  onSearchChange,
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
        {/* Done */}
        <Button
          type="button"
          variant="outline"
        ></Button>
        <Button
          type="button"
          variant="outline"
        ></Button>
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