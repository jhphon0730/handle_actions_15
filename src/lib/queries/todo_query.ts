import { db } from "@/lib/db";

export const getTodoHeaders = async (): Promise<string[]> => {
  const todo = await db.todo.findFirst();
  return todo ? Object.keys(todo) : [];
}

