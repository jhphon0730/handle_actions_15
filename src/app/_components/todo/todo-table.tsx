import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Todo } from "@/lib/types";

type TodoTableProps = {
  todos: Todo[];
  isOutOfRange: boolean;
}

export const TodoTable = async ({ todos, isOutOfRange }: TodoTableProps) => {
  if ((!todos || todos.length === 0) && !isOutOfRange) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Spinner />
        <div className="text-muted-foreground">
          No Todos found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4 rounded-md border">
    {/* 전체 목록 */}
    {/* 검색 및 필터링 / Toolbar */}

    {/* 데이터 테이블 */}
    <Table>
      <TableHeader>
        <TableRow>
          {/* TODO : TableHeadCell.tsx 추가 */}
          <TableHead className="w-[100px] font-bold"><div>Todo</div></TableHead>
          <TableHead className="w-full font-bold"><div>Title</div></TableHead>
          <TableHead className="w-[100px] font-bold"><div>Status</div></TableHead>
          <TableHead className="w-[100px] font-bold"><div>Create At</div></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.length ? (
          todos.map((todo) => (
            <TableRow>
              <TableCell>
                Todo-{todo.id.slice(-5)}
              </TableCell>
              <TableCell>
                {todo.title}
              </TableCell>
              <TableCell>
                {todo.done ? "Done" : "Pending" }
              </TableCell>
              <TableCell>
                {todo.createdAt.toLocaleString("ko-KR", { timeZone: "UTC" })}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="h-24 text-center"
            >No Todos.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

    </div>
  )
}
