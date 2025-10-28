import { db } from "@/lib/db";

import { Category } from "@/lib/types";

type getCategoriesQueryParams = {
  page: number;
  limit: number;
};

type getCategoriesQueryResult = {
  categories: Category[];
  totalCount: number;
}

// page >= 1 && limit >= 1
export const getCategoriesQuery = async ({ page, limit }: getCategoriesQueryParams): Promise<getCategoriesQueryResult> => {
  const [categories, totalCount] = await Promise.all([
    db.category.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.category.count(),
  ]);

  return { categories, totalCount };
}