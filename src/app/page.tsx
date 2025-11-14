import { TodoTable } from "./_components/todo/todo-table"

import { getTodosWithCount } from "@/lib/actions/todo-actions";
import { getTodoHeaders } from "@/lib/queries/todo_query";

const MainPage = async () => {
  const { todos, totalCount } = await getTodosWithCount();
  const todoHeaders = await getTodoHeaders();

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
      <div className="flex flex-col gap-2 mx-auto">
        {/* 할 일 목록 */}
        <TodoTable 
          todos={todos}
          totalCount={totalCount}
          todoHeaders={todoHeaders}
        />
      </div>
    </div>
  )
}

export default MainPage;
