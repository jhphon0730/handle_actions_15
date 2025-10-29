import { z } from "zod";

/* 할일 생성 검증 */
export const todoCreateSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters")
    .trim(),
})

/* 타입 추출 */
export type TodoCreateFormData = z.infer<typeof todoCreateSchema>;