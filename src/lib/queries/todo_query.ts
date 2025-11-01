import { db } from "@/lib/db";

import { Todo } from "@/lib/types";

type getTodosQueryResult = {
  todos: Todo[];
  totalCount: number;
}

export const getTodoHeaders = async (): Promise<string[]> => {
  const todo = await db.todo.findFirst();
  return todo ? Object.keys(todo) : [];
}

export const getTodosQuery = async (): Promise<getTodosQueryResult> => {
  const [todos, totalCount] = await Promise.all([
    db.todo.findMany({
      orderBy: { createdAt: "desc" },
    }),
    db.todo.count()
  ]);
  
  return { todos, totalCount };
}