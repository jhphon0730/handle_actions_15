"use server";

import { db} from "@/lib/db";
import { revalidatePath } from "next/cache";

/* todo 모두 조회 */
export const getTodos = async () => {
  try {
    const todos = await db.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: todos };
  } catch (error) {
    return { success: false, error: "Faild to fetch todo" };
  }
};

/* todo 생성 */
export const createTodo = async (title: string) => {
  if (!title.trim()) {
    return { success: false, error: "Title is required" };
  }

  try {
    await db.todo.create({
      data: { title: title.trim() },
    })

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create todo" };
  }
}

// todo 완료/미완료 토글
export async function toggleTodo(id: string) {
  try {
    const todo = await db.todo.findUnique({
      where: { id },
    })

    if (!todo) {
      return { success: false, error: "Todo not found" }
    }

    const updatedTodo = await db.todo.update({
      where: { id },
      data: {
        done: !todo.done,
      },
    })

    revalidatePath("/")
    return { success: true, data: updatedTodo }
  } catch (error) {
    return { success: false, error: "Failed to toggle todo" }
  }
}

// todo 삭제
export async function deleteTodo(id: string) {
  try {
    await db.todo.delete({
      where: { id },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete todo" }
  }
}