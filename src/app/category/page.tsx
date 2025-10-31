import { CategoryList } from "@/app/category/components/category-list"

type CategoryPageProps = {
  searchParams: { 
    [key: string]: string | string[] | undefined 
  };
};

const CategoryPage = async ({searchParams}: CategoryPageProps) => {
  const sp = await searchParams;
  const page = sp.page as string ?? "1";
  const limit = sp.limit as string ?? "5";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 페이지 Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Category Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Organize your tasks by managing categories effectively.
          </p>
        </div>
      </div>

      {/* 카테고리 추가 및 목록 */}
      <div className="w-full mx-auto">
        {/* 카테고리 목록 */}
        <CategoryList 
          page={Math.max(parseInt(page as string, 10), 1)}
          limit={Math.max(parseInt(limit as string, 10))}
        />
      </div>
      
    </div>

  )
}

export default CategoryPage