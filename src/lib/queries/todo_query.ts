import { db } from "@/lib/db";

import { Todo } from "@/lib/types";

type getTodsQueryParams = {
  page: number;
  limit: number;
}

type getTodosQueryResult = {
  todos: Todo[];
  totalCount: number;
}

export const getTodosQuery = async ({ page, limit }: getTodsQueryParams): Promise<getTodosQueryResult> => {
  const [todos, totalCount] = await Promise.all([
    db.todo.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.todo.count()
  ]);
  
  return { todos, totalCount };
}