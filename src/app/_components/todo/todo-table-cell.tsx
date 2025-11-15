import { Button } from "@/components/ui/button";
import { TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { cn, FirstChildCharUpper } from "@/lib/utils";
import type { Todo } from "@/lib/types";

/* 공통 셀 타입 */
type BaseCellProps = React.HTMLAttributes<HTMLDivElement> & {
  cellData: string;
}

type TodoTableHeadCellProps = BaseCellProps & {
  sortableColumn: {
    column: keyof Todo | null;
    order: "asc" | "desc" | null;
  }
  handleSortByColumn: (column: keyof Todo, order: "asc" | "desc") => void
}

/* 헤더 셀 */
export const TodoTableHeadCell = ({ cellData, className, sortableColumn, handleSortByColumn, ...props }: TodoTableHeadCellProps) => {
  const customClass = cellData === "title" ? "w-full" : "w-[300px]";
  const customClassByHead = cellData === "title" ? "flex items-center gap-2" : "w-[150px]"
  cellData = cellData === "id" ? "#" : cellData;

  /* 정렬이 가능한 컬럼 식별 */
  const isSortable = cellData === "title" || cellData === "status" || cellData === "priority";

  return (
    <TableHead
      {...props}
      className={cn(className, customClass, "font-semibold") }
    >
      <div className={customClassByHead}>
        {/* ID의 경우 "#"으로 변경, 첫 글자만 대문자 -> 소문자로 유지 */}
        { !isSortable ? FirstChildCharUpper(cellData) : (
          <SortableHeader 
            label={cellData}
            sortableColumn={sortableColumn}
            onSort={handleSortByColumn}
          />
        )}
      </div>
    </TableHead>
    
  );
};

type SortableHeaderProps = {
  label: string;
  sortableColumn: {
    column: keyof Todo | null;
    order: "asc" | "desc" | null;
  }
  onSort: (column: keyof Todo, order: "asc" | "desc") => void
}

/* Title 헤더 셀 정렬 */
const SortableHeader = ({label, sortableColumn, onSort}: SortableHeaderProps) => {
  // <button onClick={() => {onSort(label as keyof Todo, "asc")}}>{label}</button>
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="px-0 font-semibold">
          <span>{FirstChildCharUpper(label)}</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

/* 바디 셀 */
export const TodoTableBodyCell = ({ cellData, ...props }: BaseCellProps) => {
  return (
    <TableCell>
      {cellData}
    </TableCell>
  );
};
