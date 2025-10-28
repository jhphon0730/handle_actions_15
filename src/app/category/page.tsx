import { CategoryCreateForm } from "@/components/category/category-create-form"
import { CategoryList } from "@/components/category/category-list"

const CategoryPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <p className="text-2xl text-muted-foreground">Manage your categories</p>
      </div>

      {/* 카테고리 추가 및 목록 */}
      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 ">
        {/* 카테고리 추가 */}
        <CategoryCreateForm />

        {/* 카테고리 목록 */}
        <CategoryList />
      </div>
      
    </div>

  )
}

export default CategoryPage