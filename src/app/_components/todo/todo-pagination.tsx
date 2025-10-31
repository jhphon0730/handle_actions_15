import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { cn } from "@/lib/utils";

type TodoPaginationProps = {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  isOutOfRange: boolean;
}

export const TodoPagination = ({page, limit, totalPages, totalCount, isOutOfRange}: TodoPaginationProps) => {
  return (
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
  )
};