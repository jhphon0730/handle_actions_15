import { getTodos } from "@/lib/actions/todo-actions"
import { TodoList } from "@/components/todo-list"
import { Toaster } from "@/components/ui/sonner"

export default async function Home() {
  const result = await getTodos()
  const todos = result.success ? result.data : []

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Todo List</h1>
          <p className="text-muted-foreground">Manage your tasks</p>
        </div>
        <TodoList todos={todos} />
      </div>
      <Toaster />
    </main>
  )
}
