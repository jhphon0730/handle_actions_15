import type React from "react";
import { 
  X, PlusCircle, 
  Circle, CheckCircle, Timer, CircleHelp,
  ArrowDown, ArrowRight, ArrowUp,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { ButtonGroup, } from "@/components/ui/button-group"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TodoCreateForm } from "./todo-form";

import { useTodoStore } from "@/store/useTodoStore";

type TodoToolbarProps = {
}

export const TodoToolbar = ({
}: TodoToolbarProps) => {
  const { 
    search, handleSearchChange,
    statusFilter, handleStatusFilter,
    priorityFilter, handlePriorityFilter,
    isFilterd, handleResetFilters,

  } = useTodoStore();

  return (
    <div className="flex items-center flex-wrap justify-between gap-2">
      <div className="flex items-center gap-2">
        <Input 
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
          className="max-w-3xs"
        />
        {/* Status */}
        <StatusFilter 
          statusFilter={statusFilter}
          onStatusFilter={handleStatusFilter}
        />
        {/* Priority */}
        <PriorityFilter
          priorityFilter={priorityFilter}
          onPriorityFilter={handlePriorityFilter}
        />
        { isFilterd &&
          <Button
            type="button"
            variant="ghost"
            onClick={handleResetFilters}
          >
            Reset
            <X />
          </Button>
        }
      </div>
      <div className="flex items-center gap-2">
        <TodoCreateForm />
      </div>
    </div>
  );
};

type StatusFilterProps = {
  statusFilter: string[];
  onStatusFilter: (status: string) => void;
}

/* Status로 필터링 */
const StatusFilter = ({statusFilter, onStatusFilter}: StatusFilterProps) => {
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
                <CommandItem value="open" onSelect={onStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("open")}
                  />
                  <Circle />
                  Open
                </CommandItem>
                {/* Close */}
                <CommandItem value="close" onSelect={onStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("close")}
                  />
                  <CheckCircle />
                  Close
                </CommandItem>
                {/* In-Progress */}
                <CommandItem value="in-progress" onSelect={onStatusFilter}>
                  <Checkbox 
                    checked={statusFilter.includes("in-progress")}
                  />
                  <Timer />
                  In-Progress
                </CommandItem>
                {/* Pending */}
                <CommandItem value="pending" onSelect={onStatusFilter}>
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

type PriorityFilterProps = {
  priorityFilter: string[];
  onPriorityFilter: (priority: string) => void;
}

const PriorityFilter = ({priorityFilter, onPriorityFilter}: PriorityFilterProps) => {
  return (
    <ButtonGroup>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="dashed"
          >
            <PlusCircle />
            Priority
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0">
          <Command>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No Found.</CommandEmpty>
              <CommandGroup>
                {/* low */}
                <CommandItem value="low" onSelect={onPriorityFilter}>
                  <Checkbox 
                    checked={priorityFilter.includes("low")}
                  />
                  <ArrowDown />
                  Low
                </CommandItem>
                {/* medium */}
                <CommandItem value="medium" onSelect={onPriorityFilter}>
                  <Checkbox 
                    checked={priorityFilter.includes("medium")}
                  />
                  <ArrowRight />
                  Medium
                </CommandItem>
                {/* High */}
                <CommandItem value="high" onSelect={onPriorityFilter}>
                  <Checkbox 
                    checked={priorityFilter.includes("high")}
                  />
                  <ArrowUp />
                  High
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* 필터링 된 항목이 있으면 숫자로 표기 */}
      {priorityFilter.length > 0 && (
        <Button
          key={status}
          variant="dashed"
        >
          <Badge 
            variant="outline"
          >
          {priorityFilter.length}
          </Badge>
        </Button>
      )}
    </ButtonGroup>
  )
}