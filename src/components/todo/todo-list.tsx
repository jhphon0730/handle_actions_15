import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

import { getTodosQuery } from "@/lib/queries/todo_query";

type TodoListProps = {
  page: number,
  limit: number
}

const TodoList = async ({ page, limit }: TodoListProps) => {
  const { todos, totalCount } = await getTodosQuery({page, limit});

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
    <div className="mt-4 md:ms-4 md:mt-0">
      <div className="mb-1 flex items-center justify-between">
        <Badge variant="outline">Todos Count: {totalCount}</Badge>
      </div>

      {/* 전체 목록 */}
      <ul className="space-y-2">
        { todos.map((todo) => (
          <li
            key={todo.id}
            className="rounded-xl border p-4 hover:bg-muted transition-colors"
          >
            <p>{todo.title}</p>
            {/* 생성 날짜 */}
            <div className="text-sm text-muted-foreground">
              Created: {todo.createdAt.toLocaleString()}
            </div>
          </li>
        ))
        }
      </ul>

      {/* TODO : 페이징 처리 추가해야 함 */}
    </div>
  )
}

export { TodoList }