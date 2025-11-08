import { TableHead } from "@/components/ui/table";

import { cn } from "@/lib/utils";

/* 공통 셀 타입 */
type BaseCellProps = React.HTMLAttributes<HTMLDivElement> & {
  cellData: string;
}

/* 셀 타입 분기 */
type TodoTableCellProps = BaseCellProps & {
  cellType: "head" | "body";
}

export const TodoTableCell = ({ cellData, cellType, ...props }: TodoTableCellProps) => {
  return cellType === "head" ? (
    <TodoTableHeadCell cellData={cellData} {...props} />
  ) : (
    <TodoTableBodyCell cellData={cellData} {...props} />
  );
};

/* 헤더 셀 */
const TodoTableHeadCell = ({ cellData, className, ...props }: BaseCellProps) => {
  const customClass = cellData === "title" ? "w-full" : "w-[300px]";
  const customClassByHead = cellData === "title" ? "flex items-center gap-2" : "w-[150px]"

  return (
    <TableHead
      {...props}
      className={cn(className, customClass, "font-semibold") }
    >
      <div className={customClassByHead}>
        <span>{cellData.charAt(0).toUpperCase() + cellData.slice(1)}</span>
      </div>
    </TableHead>
    
  );
};

/* 바디 셀 */
const TodoTableBodyCell = ({ cellData, ...props }: BaseCellProps) => {
  return (
    <></>
  );
};
