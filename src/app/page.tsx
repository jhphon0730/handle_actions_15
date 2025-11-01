import { TodoTable } from "@/app/_components/todo/todo-table"
import { TodoPagination } from "./_components/todo/todo-pagination";

import { getTodoHeaders, getTodosQuery } from "@/lib/queries/todo_query";

type TodoPageProps = {
  searchParams: { 
    [key: string]: string | string[] | undefined 
  };
};

const MainPage = async ({ searchParams }: TodoPageProps) => {
  const sp = await searchParams;
  const page = Math.max(parseInt(sp.page as string ?? "1"), 1);
  const limit = Math.max(parseInt(sp.limit as string ?? "5"), 1);

  const { todos, totalCount } = await getTodosQuery({page, limit});
  const todoHeaders = await getTodoHeaders();

  /* 페이징 처리 데이터 정제 */
  const totalPages = Math.ceil(totalCount / limit);
  const isOutOfRange = totalCount > 0 && todos.length === 0 && page > totalPages;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 페이지 Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Fucking Todo App</h2>
          <p className="text-sm text-muted-foreground">Manage your tasks efficiently and effectively.</p>
        </div>
      </div>

      {/* 목록 */}
      <div className="w-full mx-auto">
        {/* 페이지 범위를 넘어가면 */}
        { isOutOfRange && (
          <div className="mb-2 rounded-md border p-3 text-xs text-red-600">
            The requested page {page} is out of range. Please select a page between 1 and {totalPages}.
          </div>
        )}

        {/* 할 일 목록 */}
        <TodoTable 
          todos={todos}
          todoHeaders={todoHeaders}
          isOutOfRange={isOutOfRange}
        />

        {/* 페이지네이션 */}
        <TodoPagination
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalCount={totalCount}
          isOutOfRange={isOutOfRange}
        />
      </div>
    </div>
  )
}

export default MainPage;