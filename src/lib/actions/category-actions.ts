"use server";

import { db} from "@/lib/db";
import { revalidatePath } from "next/cache";

import { Category } from "@/lib/types";
import { categoryCreateSchema } from "../validations/category-validations";

/* 반환 타입 */
export type CreateCategoryActionResult = 
  { success: true; category: Category; errors?: Record<string, string[]> } |
  { success: false; errors: Record<string, string[]> };

export const createCategoryAction = async (prevState: CreateCategoryActionResult | null, formData: FormData): Promise<CreateCategoryActionResult> => {
  try {
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    const validated = categoryCreateSchema.safeParse({ name, color });
    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.flatten().fieldErrors,
      }
    }
    
    const validName = validated.data.name;
    const validColor = validated.data.color;

    const createdCategory = await db.category.create({
      data: {
        name: validName,
        color: validColor,
      }
    });

    // revalidatePath("/category");

    return {
      success: true,
      category: createdCategory
    }
  } catch {
    return {
      success: false,
      errors: {
        _form: ["An unexpected error occurred. Please try again."]
      }
    }
  }
}