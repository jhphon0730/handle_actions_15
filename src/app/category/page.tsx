import { CategoryCreateForm } from "@/components/category/category-form"
import { CategoryList } from "@/components/category/category-list"

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
      <div className="space-y-2">
        <p className="text-2xl text-muted-foreground">Manage your categories</p>
      </div>

      {/* 카테고리 추가 및 목록 */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 ">
        {/* 카테고리 추가 */}
        <CategoryCreateForm />

        {/* 카테고리 목록 */}
        <CategoryList 
          page={parseInt(page as string, 10)} 
          limit={parseInt(limit as string, 10)}
        />
      </div>
      
    </div>

  )
}

export default CategoryPage