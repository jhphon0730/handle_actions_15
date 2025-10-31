import { TodoList } from "@/components/todo/todo-list"

type TodoPageProps = {
  searchParams: { 
    [key: string]: string | string[] | undefined 
  };
};

const MainPage = async ({ searchParams }: TodoPageProps) => {
  const sp = await searchParams;
  const page = sp.page as string ?? "1";
  const limit = sp.limit as string ?? "5";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 페이지 Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Fucking Todo App</h2>
          <p className="text-sm text-muted-foreground">Manage your tasks efficiently and effectively.</p>
        </div>
      </div>

      {/* 할일 추가 및 목록 */}
      <div className="w-full mx-auto">
        {/* 할 일 목록 */}
        <TodoList 
          page={Math.max(parseInt(page as string, 10), 1)}
          limit={Math.max(parseInt(limit as string, 10))}
        />
      </div>
    </div>
  )
}

export default MainPage;