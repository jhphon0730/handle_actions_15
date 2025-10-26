import { getTodos } from "@/lib/actions/todo-actions"
import { TodoList } from "@/components/todo/todo-list"


const MainPage = async () => {
  const result = await getTodos()
  const todos = result.success ? result.data : []

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">Manage your tasks</p>
      </div>
      <TodoList todos={todos} />
    </div>
  )
}

export default MainPage;