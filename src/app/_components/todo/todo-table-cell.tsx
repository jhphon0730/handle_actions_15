/* th, td에 속하는 속성들에서 사용하는 컴포넌트 */
import { cva, type VariantProps } from "class-variance-authority"

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
  const customClass = cellData === "id" ? "w-[100px]" :
    cellData === "title" ? "w-full" :
      cellData === "status" ? "w-[100px]" :
        "w-[100px]";

  return (
    <TableHead
      {...props}
      className={cn(className, customClass) }
    >
      <div>
        <span>{cellData}</span>
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
