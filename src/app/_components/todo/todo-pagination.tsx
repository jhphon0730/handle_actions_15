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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn, buildPaginationRange } from "@/lib/utils";

type TodoPaginationProps = {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onSelectPage: (page: number) => void;
  onSelectLimit: (limit: number) => void;
}

export const TodoPagination = ({
  page, limit, totalPages, totalCount,
  onNextPage, onPrevPage, onSelectPage, onSelectLimit,
}: TodoPaginationProps) => {
  const [pageNumbers, setPageNumbers] = useState<(number | "...")[]>([]);

  useEffect(() => {
    setPageNumbers(() => buildPaginationRange(page, totalCount, limit))
  }, [page, limit])

  return (
    <div className="flex items-center justify-end gap-1">
      {/* 현재 페이지 */}
      {totalPages > 0 && (
        <span className="text-xs text-muted-foreground mx-2">
          Page {page} of {totalPages}
        </span>
      )}

      <Select onValueChange={(value) => {onSelectLimit(Number(value))}}>
        <SelectTrigger className="w-28 h-8">
          <SelectValue placeholder={`Show ${limit}`} />
        </SelectTrigger>
        <SelectContent>
          {[3, 5, 10, 20, 50].map((size) => (
            <SelectItem key={size} value={String(size)}>
              Show {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 페이지 이동 */}
      { totalPages > 1 && (
        <Pagination className="mx-0 justify-start w-auto">
          <PaginationContent>
            {/* 이전 */}
            <PaginationItem>
              <PaginationPrevious
                href="/"
                className={cn(`
                  page === 1 ? "pointer-events-none opacity-50" : ""
                `)}
                onClick={onPrevPage}
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
                    onClick={() => onSelectPage(Number(pageItem))}
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
                onClick={onNextPage}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination> 
      )}
    </div>
  )
};