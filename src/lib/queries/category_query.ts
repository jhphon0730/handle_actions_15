import { db } from "@/lib/db";

import { Category } from "@/lib/types";

type getCategoriesQueryParams = {
  page: number;
  limit: number;
};

// page >= 1 && limit >= 1
export const getCategoriesQuery = async ({ page, limit }: getCategoriesQueryParams): Promise<Category[]> => {
  const categories: Category[] = await db.category.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  return categories;
}