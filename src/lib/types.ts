// todo 타입
export interface Todo {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

// category 타입
export interface Category {
  id: string
  name: string
  color: string
  createdAt: Date
}