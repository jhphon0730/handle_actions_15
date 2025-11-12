// todo 타입
export type TodoStatus = "open" | "close" | "in-progress" | "pending"
export type TodoPriority = "low" | "medium" | "high"

export interface Todo {
  id: string
  title: string
  status: TodoStatus
  priority: TodoPriority
  createdAt: Date
}

// category 타입
export interface Category {
  id: string
  name: string
  color: string
  createdAt: Date
}