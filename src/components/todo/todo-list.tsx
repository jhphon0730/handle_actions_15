"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { Todo } from "@/lib/types"
import { useToast } from "@/hooks/toast-hook"
import { createTodo, toggleTodo, deleteTodo } from "@/lib/actions/todo-actions"


type TodoListProps = {
  todos: Todo[] | undefined;
}

const TodoList = ({ todos }: TodoListProps) => {
  const { showError, showInfo, showSuccess } = useToast()

  const [title, setTitle] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    startTransition(async () => {
      const result = await createTodo(title)
      if (result.success) {
        setTitle("")
        showSuccess("Todo created successfully")
      } else {
        showError(result.error ?? "An unexpected error occurred")
      }
    })
  }

  const handleToggle = async (id: string) => {
    startTransition(async () => {
      const result = await toggleTodo(id)
      if (!result.success) {
        showError(result.error ?? "An unexpected error occurred")
      }
    })
  }

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteTodo(id)
      if (result.success) {
        showSuccess("Todo deleted successfully")
      } else {
        showError(result.error ?? "An unexpected error occurred")
      }
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleCreate} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          className="flex-1"
        />
        <Button type="submit" disabled={isPending || !title.trim()}>
          Add
        </Button>
      </form>

      <div className="space-y-2">
        {!todos || todos.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">No todos yet. Add one to get started!</Card>
        ) : (
          todos.map((todo) => (
            <Card key={todo.id} className="p-4">
              <div className="flex items-center gap-3">
                <Checkbox checked={todo.done} onCheckedChange={() => handleToggle(todo.id)} disabled={isPending} />
                <span className={`flex-1 ${todo.done ? "line-through text-muted-foreground" : ""}`}>{todo.title}</span>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(todo.id)} disabled={isPending}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export { TodoList }