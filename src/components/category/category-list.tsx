import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { buildPaginationRange, cn } from "@/lib/utils";
import { getCategoriesQuery } from "@/lib/queries/category_query";

type CategoryListProps = {
  page: number,
  limit: number
}

export const CategoryList = async ({ page, limit }: CategoryListProps) => {
  const { categories, totalCount } = await getCategoriesQuery({page, limit});

  /* 페이징 처리 데이터 정제 */
  // 최대 페이지 수
  const totalPages = Math.ceil(totalCount / limit);
  // 페이지 범위 초과 여부
  const isOutOfRange = totalCount > 0 && categories.length === 0 && page > totalPages;
  // 페이지 번호 목록 배열
  const pageNumbers = buildPaginationRange(page, totalCount, limit)

  {/* 로딩중 & 카테고리 데이터가 없을 떄 보여지는 UI */}
  if ((!categories || categories.length === 0) && !isOutOfRange) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Spinner />
        <div className="text-muted-foreground">
          No category found.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:ms-12 md:mt-0">
      <div className="mb-1 flex items-center justify-between">
        {/* 현재 페이지 */}
        {totalPages > 0 && (
          <span className="text-xs text-muted-foreground mx-2">
            Page {page} of {totalPages}
          </span>
        )}
      </div>

      {/* 페이지 범위를 넘어가면 */}
      { isOutOfRange && (
        <div className="mb-2 rounded-md border p-3 text-xs text-red-600">
          The requested page {page} is out of range. Please select a page between 1 and {totalPages}.
        </div>
      )}

      {/* 전체 목록 */}
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="rounded-xl border p-4 hover:bg-muted transition-colors"
          >
            {/* 이름 및 색상 정보 확인*/}
            <div className="flex items-center justify-between flex-wrap font-medium">
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

      {/* 페이지가 2이상일 때 표시 */}
      { totalPages > 1 && !isOutOfRange && (
        <Pagination className="mt-2">
          <PaginationContent>
            {/* 이전 
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? `/category?page=${page - 1}&limit=${limit}` : "#"}
                className={cn(`
                  page === 1 ? "pointer-events-none opacity-50" : ""
                `)}
              />
            </PaginationItem>
            */}

            {/* 페이지 번호 목록 */}
            { pageNumbers.map((pageItem, index) => { 
              if (pageItem === "...") {
                return <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`/category?page=${pageItem}&limit=${limit}`}
                    isActive={pageItem === page}
                  >{pageItem}</PaginationLink>
                </PaginationItem>
              )
            })}

            {/* 다음
            <PaginationItem>
              <PaginationNext
                href={page < totalPages ? `/category?page=${page + 1}&limit=${limit}` : "#"}
                className={cn(`
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                `)}
              />
            </PaginationItem>
            */}

          </PaginationContent>
        </Pagination> 
      )}
    </div>
  );
}
