import { TodoCreateForm } from "@/components/todo/todo-create-form"
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
      <div className="space-y-2">
        <p className="text-2xl text-muted-foreground">Manage your tasks</p>
      </div>

      {/* 할일 추가 및 목록 */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* 할 일 추가 */}
        <TodoCreateForm />

        {/* 할 일 목록 */}
        <TodoList 
          page={parseInt(page as string, 10)}
          limit={parseInt(limit as string, 10)}
        />
      </div>
    </div>
  )
}

export default MainPage;