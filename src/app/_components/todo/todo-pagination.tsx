"use client";

import type React from "react";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

import { cn, buildPaginationRange } from "@/lib/utils";

type TodoPaginationProps = {
  
  totalCount: number;
}

export const TodoPagination = ({totalCount}: TodoPaginationProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState<(number | "...")[]>([]);

  useEffect(() => {
    setTotalPages(() => Math.ceil(totalCount / limit))
    setPageNumbers(() => buildPaginationRange(page, totalCount, limit))
  }, [page, limit])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {/* 현재 페이지 */}
      {totalPages > 0 && (
        <span className="text-xs text-muted-foreground mx-2">
          Page {page} of {totalPages}
        </span>
      )}

      {/* 페이지 이동 */}
      { totalPages > 1 ? (
        <Pagination className="mx-0 justify-start w-auto">
          <PaginationContent>
            {/* 이전 */}
            <PaginationItem>
              <PaginationPrevious
                href="/"
                className={cn(`
                  page === 1 ? "pointer-events-none opacity-50" : ""
                `)}
                onClick={() => handlePageChange(page - 1)}
              />
            </PaginationItem>

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
                    href="/"
                    isActive={pageItem === page}
                    onClick={() => handlePageChange(Number(pageItem))}
                  >{pageItem}</PaginationLink>
                </PaginationItem>
              )
            })}

            {/* 다음 */}
            <PaginationItem>
              <PaginationNext
                href="/"
                className={cn(`
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                `)}
                onClick={() => handlePageChange(page + 1)}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination> 
      ) : (
        <>123</>
      )}
    </div>
  )
};