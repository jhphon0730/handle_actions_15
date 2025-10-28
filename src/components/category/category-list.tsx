import { db } from "@/lib/db";

import { Spinner } from "@/components/ui/spinner";

import { Category } from "@/lib/types";

export const CategoryList = async () => {
  const categories: Category[] = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Spinner />
        <div className="text-muted-foreground">
          No categories found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* TODO : 여기에 카테고리 개수 표시 예정 */}
      {/* 전체 목록 */}
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="rounded-xl border p-4 hover:bg-muted transition-colors"
          >
            <div className="font-medium">{category.name}</div>
            <div className="text-sm text-muted-foreground">
              Created: {category.createdAt.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
      {/* TODO : 페이징 처리 추가해야 함 */}
    </div>
  );
}
