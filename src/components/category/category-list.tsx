import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

import { getCategoriesQuery } from "@/lib/queries/category_query";

type CategoryListProps = {
  page: number,
  limit: number
}

export const CategoryList = async ({ page, limit }: CategoryListProps) => {
  const { categories, totalCount } = await getCategoriesQuery({page, limit});

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
    <div className="ms-4">
      {/* TODO : 여기에 카테고리 개수 표시 예정 */}
      <div className="mb-4 flex items-center justify-between">
        <Badge variant="outline">Category Count: {totalCount}</Badge>
      </div>

      {/* 전체 목록 */}
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="rounded-xl border p-4 hover:bg-muted transition-colors"
          >
            {/* 이름 및 색상 정보 확인*/}
            <div className="font-medium">
              <span>{category.name}</span>
              <Badge className={`ms-2 h-5 w-5 border border-gray-50`} style={{ backgroundColor: category.color }}>
              </Badge>
            </div>
            {/* 생성 날짜 */}
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
