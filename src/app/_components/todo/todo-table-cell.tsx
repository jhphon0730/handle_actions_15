import { Button } from "@/components/ui/button";
import { TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { cn, FirstChildCharUpper } from "@/lib/utils";
import type { Todo } from "@/lib/types";

/* 공통 셀 타입 */
type BaseCellProps = React.HTMLAttributes<HTMLDivElement> & {
  cellData: string;
}

/* 헤더 셀 */
export const TodoTableHeadCell = ({ cellData, className, ...props }: BaseCellProps) => {
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
          />
        )}
      </div>
    </TableHead>
    
  );
};

type SortableHeaderProps = {
  label: string;
}

/* Title 헤더 셀 정렬 */
const SortableHeader = ({label}: SortableHeaderProps) => {
  // <button onClick={() => {onSort(label as keyof Todo, "asc")}}>{label}</button>
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="px-0 font-semibold gap-2">
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
