import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { buildPaginationRange, cn } from "@/lib/utils";
import { getTodosQuery } from "@/lib/queries/todo_query";

type TodoListProps = {
  page: number,
  limit: number
}

const TodoList = async ({ page, limit }: TodoListProps) => {
  const { todos, totalCount } = await getTodosQuery({page, limit});

  /* 페이징 처리 데이터 정제 */
  const totalPages = Math.ceil(totalCount / limit);
  const isOutOfRange = totalCount > 0 && todos.length === 0 && page > totalPages;
  const pageNumbers = buildPaginationRange(page, totalCount, limit)

  if ((!todos || todos.length === 0) && !isOutOfRange) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Spinner />
        <div className="text-muted-foreground">
          No Todos found.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* 페이지 범위를 넘어가면 */}
      { isOutOfRange && (
        <div className="mb-2 rounded-md border p-3 text-xs text-red-600">
          The requested page {page} is out of range. Please select a page between 1 and {totalPages}.
        </div>
      )}

      {/* 전체 목록 */}
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터링 / Toolbar */}

        {/* 데이터 테이블 */}

      </div>
      

      {/* 페이지네이션 */}
      <div className="flex items-center justify-end gap-1">
        {/* 현재 페이지 */}
        {totalPages > 0 && (
          <span className="text-xs text-muted-foreground mx-2">
            Page {page} of {totalPages}
          </span>
        )}

        {/* 페이지 이동 */}
        { totalPages > 1 && !isOutOfRange && (
          <Pagination className="mx-0 justify-start w-auto">
            <PaginationContent>
              {/* 이전 */}
              <PaginationItem>
                <PaginationPrevious
                  href={page > 1 ? `/?page=${page - 1}&limit=${limit}` : "#"}
                  className={cn(`
                    page === 1 ? "pointer-events-none opacity-50" : ""
                  `)}
                />
              </PaginationItem>

              {/* 다음 */}
              <PaginationItem>
                <PaginationNext
                  href={page < totalPages ? `/?page=${page + 1}&limit=${limit}` : "#"}
                  className={cn(`
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  `)}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination> 
        )}
      </div>
    </div>
  )
}

export { TodoList }