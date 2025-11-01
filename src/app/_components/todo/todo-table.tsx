import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TodoTableCell } from "@/app/_components/todo/todo-table-cell";

import { Todo } from "@/lib/types";

type TodoTableProps = {
  todos: Todo[];
  todoHeaders: string[];
}

export const TodoTable = async ({ todos, todoHeaders}: TodoTableProps) => {
  if (!todos || todos.length === 0) {
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
    <Table>
      <TableHeader>
        <TableRow>
          {todoHeaders.length ? (
            todoHeaders.map((header) => (
              <TodoTableCell
                key={header}
                cellType="head"
                cellData={header}
              />
            ))
          ) : (
            <TableHead>
              <TodoTableCell
                cellType="head"
                cellData="No Headers"
              />
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.length ? (
          todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                Todo-{todo.id.slice(-5)}
              </TableCell>
              <TableCell>
                {todo.title}
              </TableCell>
              <TableCell className="uppercase">
                {todo.status}
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
