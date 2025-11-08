import type React from "react";
import { X, PlusCircle, Circle, CheckCircle, Timer, CircleHelp } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  ButtonGroup,
} from "@/components/ui/button-group"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type TodoToolbarProps = {
  isFilterd: boolean;
  searchData: string;
  statusFilter: string[];
  onSearchChange: (value: string) => void;
  onAddStatusFilter: (status: string) => void;
  onResetFilters: () => void;
}

export const TodoToolbar = ({
  isFilterd, searchData, statusFilter,
  onSearchChange, onAddStatusFilter, onResetFilters,
}: TodoToolbarProps) => {
  return (
    <div className="flex items-center flex-wrap justify-between gap-2">
      <div className="flex items-center gap-2">
        <Input 
          type="text"
          placeholder="Search todos..."
          value={searchData}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          className="max-w-3xs"
        />
        {/* Status */}
        <StatusFilter 
          statusFilter={statusFilter}
          onAddStatusFilter={onAddStatusFilter}
        />
        <Button
          type="button"
          variant="dashed"
        ><PlusCircle />Priority</Button>
        { isFilterd &&
          <Button
            type="button"
            variant="ghost"
            onClick={onResetFilters}
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

type StatusFilterProps = {
  statusFilter: string[];
  onAddStatusFilter: (status: string) => void;
}

/* Status로 필터링 */
const StatusFilter = ({statusFilter, onAddStatusFilter}: StatusFilterProps) => {
  return (
    <ButtonGroup>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="dashed"
          >
            <PlusCircle />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0">
          <Command>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No Found.</CommandEmpty>
              <CommandGroup>
                {/* Open */}
                <CommandItem value="open" onSelect={onAddStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("open")}
                  />
                  <Circle />
                  Open
                </CommandItem>
                {/* Close */}
                <CommandItem value="close" onSelect={onAddStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("close")}
                  />
                  <CheckCircle />
                  Close
                </CommandItem>
                {/* In-Progress */}
                <CommandItem value="in-progress" onSelect={onAddStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("in-progress")}
                  />
                  <Timer />
                  In-Progress
                </CommandItem>
                {/* Pending */}
                <CommandItem value="pending" onSelect={onAddStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("pending")}
                  />
                  <CircleHelp />
                  Pending
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* 필터링 된 Status가 있으면서 2개 이하면 */}
      {statusFilter.length > 0 && statusFilter.length <= 2 && statusFilter.map((status) => (
        <Button
          key={status}
          variant="dashed"
        >
          <Badge 
            variant="outline"
          >
            {status}
          </Badge>
        </Button>
      ))}
      {/* 필터링 된 Status가 있으면서 3개 이상이면 */}
      {statusFilter.length > 2 && (
        <Button
          type="button"
          variant="dashed"
        > 
          <Badge 
            variant="outline"
          >
            Selected {statusFilter.length}
          </Badge>
        </Button>
      )}
      
    </ButtonGroup>
  )
}