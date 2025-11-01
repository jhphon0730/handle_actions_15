"use server";

import { db} from "@/lib/db";
import { revalidatePath } from "next/cache";

import type { Todo } from "@/lib/types"
import { todoCreateSchema } from "../validations/todo-validations";

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

export type CreateTodoActionResult = 
  { success: true; todo: Todo } |
  { success: false; errors: Record<string, string[]> };

/* todo 생성 */
export const createTodoAction = async (prevState: CreateTodoActionResult | null, formData: FormData): Promise<CreateTodoActionResult> => {
  try {
    const title = formData.get("title") as string;

    const validated = todoCreateSchema.safeParse({title})
    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.flatten().fieldErrors,
      }
    }

    const todo = await db.todo.create({
      data: { title: validated.data.title },
    })

    revalidatePath("/");
    return { success: true, todo };
  } catch (error) {
    return { success: false, errors: {
      _form: ["An unexpected error occurred. Please try again."]
    } };
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
        status: !todo.status,
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