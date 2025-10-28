import { CategoryCreateForm } from "@/components/category/category-create-form"

const CategoryPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <p className="text-2xl text-muted-foreground">Manage your categories</p>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* 카테고리 추가 */}
        <CategoryCreateForm />

        {/* 카테고리 목록 */}
      </div>
      
    </div>

  )
}

export default CategoryPage