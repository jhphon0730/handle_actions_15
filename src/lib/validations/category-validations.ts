import { z } from "zod";

/* 카테고리 생성 검증 */
export const categoryCreateSchema = z.object({
  name: z.string()
    .min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(30, "Category name must be at most 30 characters")
    .trim(),
  color: z.string()
    .min(1, "Category color is required")
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color format. Use hex code like #RRGGBB")
    .trim(),
})

/* 타입 추출 */
export type CategoryCreateFormData = z.infer<typeof categoryCreateSchema>;