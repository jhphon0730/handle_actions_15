import { Fragment } from "react";
import {
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  CircleCheck,
  CircleHelp,
  Timer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableHead, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Todo } from "@/lib/types";
import { useTodoStore } from "@/store/useTodoStore";
import { cn, FirstChildCharUpper } from "@/lib/utils";
import { Arrow } from "@radix-ui/react-select";

/* 공통 셀 타입 */
type BaseCellProps = React.HTMLAttributes<HTMLDivElement> & {
  cellData: string;
};

/* 헤더 셀 */
export const TodoTableHeadCell = ({
  cellData,
  className,
  ...props
}: BaseCellProps) => {
  const customClass = cellData === "title" ? "w-full" : "w-[300px]";
  const customClassByHead =
    cellData === "title" ? "flex items-center gap-2" : "w-[150px]";
  cellData = cellData === "id" ? "#" : cellData;

  /* 정렬이 가능한 컬럼 식별 */
  const isSortable =
    cellData === "title" || cellData === "status" || cellData === "priority";

  return (
    <TableHead
      {...props}
      className={cn(className, customClass, "font-semibold")}
    >
      <div className={customClassByHead}>
        {/* ID의 경우 "#"으로 변경, 첫 글자만 대문자 -> 소문자로 유지 */}
        {!isSortable ? (
          FirstChildCharUpper(cellData)
        ) : (
          <SortableHeader label={cellData} />
        )}
      </div>
    </TableHead>
  );
};

type SortableHeaderProps = {
  label: string;
};

/* Title 헤더 셀 정렬 */
const SortableHeader = ({ label }: SortableHeaderProps) => {
  const { sortableColumn, handleSortByColumn } = useTodoStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="font-semibold gap-2">
          <span>{FirstChildCharUpper(label)}</span>
          {sortableColumn.column && sortableColumn.column === label ? (
            sortableColumn.order == "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )
          ) : (
            <ChevronsUpDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleSortByColumn(label as keyof Todo, "asc")}
          >
            <ArrowUp className="h-4 w-4" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleSortByColumn(label as keyof Todo, "desc")}
          >
            <ArrowDown className="h-4 w-4" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type TodoTableBodyCellProps = BaseCellProps & {
  cellType: "#" | "title" | "status" | "priority" | "createdAt";
};

/* 바디 셀 */
export const TodoTableBodyCell = ({
  cellType,
  cellData,
  ...props
}: TodoTableBodyCellProps) => {
  return (
    <TableCell>
      {cellType === "priority" ? (
        <div className="flex items-center gap-2">
          {cellData === "high" ? (
            <ArrowUp className="h-4 w-4" />
          ) : cellData === "medium" ? (
            <ArrowRight className="h-4 w-4" />
          ) : cellData === "low" ? (
            <ArrowDown className="h-4 w-4" />
          ) : null}
          {cellData}
        </div>
      ) : cellType === "status" ? (
        <div className="flex items-center gap-2">
          {cellData === "open" ? (
            <Circle className="w-4 h-4" />
          ) : cellData === "in-progress" ? (
            <Timer className="w-4 h-4" />
          ) : cellData === "pending" ? (
            <CircleHelp className="w-4 h-4" />
          ) : (
            <CircleCheck className="w-4 h-4" />
          )}
          {cellData}
        </div>
      ) : (
        cellData
      )}
    </TableCell>
  );
};
