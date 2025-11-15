"use client";

import { useState, useEffect } from "react";

import type { Todo, TodoPriority, TodoStatus } from "@/lib/types";

type TodoListDataOptions = {
  initialData: Todo[];
  dataCount: number;
  defaultSearchKey?: keyof Todo;
}

/*
  * defaultSearchKey는 검색어로 검색할 때, 사용하는 테이블 컬럼을 의미함(기본 값은 "title")
*/
export const useTodoHooks = ({initialData, dataCount, defaultSearchKey}: TodoListDataOptions) => {
  const [data, setData] = useState<Todo[]>(initialData);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(dataCount / limit));

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ [key in keyof Todo]?: string }>({});
  const [isFilterd, setIsFilterd] = useState<boolean>(false);
  const [sortableColumn, setSortableColumn] = useState<{ column: keyof Todo | null, order: "asc" | "desc" | null }>({
    column: null,
    order: null
  })

	/* initialData이 바뀌면 hooks 초기화 */
	useEffect(() => {
		setData(() => initialData);
		handleResetFilters();
	}, [initialData, dataCount]);

  /* 필터 초기화 */
  const handleResetFilters = () => {
    setSearch(() => "");
    setStatusFilter(() => [])
    setPriorityFilter(() => [])
    setFilters({});
    setIsFilterd(() => false)
		setTotalPages(() => Math.ceil(dataCount / 5));
  }

  /* 검색 */
  const handleSearchChange = (value: string): void => {
    setPage(() => 1)
    setSearch(() => value)

    setIsFilterd(() => (
      value.length > 0 ||
      Object.keys(filters).length > 0 ||
      statusFilter.length > 0 ||
      priorityFilter.length > 0
    ))
    return;
  }

  /* status 필터 추가/제거 */
  const handleStatusFilter = (value: string): void => {
    setPage(() => 1);
    setStatusFilter((prev) => {
      const newFilters = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
        
      setIsFilterd(() => (
        search.length > 0 ||
        Object.keys(filters).length > 0 ||
        newFilters.length > 0 ||
        priorityFilter.length > 0
      ))
      return newFilters;
    });
    return
  }

  /* priority로 필터 추가/삭제 */
  const handlePriorityFilter = (value: string): void => {
    setPage(() => 1)
    setPriorityFilter((prev) => {
      const newFilters = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]

      setIsFilterd(() => (
        search.length > 0 ||
        Object.keys(filters).length > 0 ||
        statusFilter.length > 0 ||
        newFilters.length > 0
      ))
      return newFilters;
    })
    return;
  }

  /* 필터링 추가 */
  const handleUpdateFilter = (key: keyof Todo, value: string) => {
    setPage(() => 1)
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  /* 정렬 설정 */
  const handleSortByColumn = (column: keyof Todo, order: "asc" | "desc") => {
    setSortableColumn(() => ({
      column,
      order
    }))
  }

  /* 필터링 된 데이터 */
  const filteredData = () => {
    let result = [...data];

    /* 검색어로 검색 */
    if (search.length && defaultSearchKey) {
      result = result.filter((item) => (
        String(item[defaultSearchKey]).toLowerCase().includes(search.toLowerCase())
      ))
    }

    /* 각 필터링 조건 적용 (key로 검색) */
    for (const key in filters) {
      const value = filters[key as keyof Todo];
      if (value) {
        result = result.filter((item) => (
          String(item[key as keyof Todo]).toLowerCase().includes(value.toLowerCase())
        ));
      }
    }

    /* status로 필터링 */
    if (statusFilter.length) {
      result = result.filter((item) => (
        statusFilter.includes(String(item.status).toLowerCase())
      ));
    }

    /* priority로 필터링 */
    if (priorityFilter.length) {
      result = result.filter((item) => (
        priorityFilter.includes(String(item.priority).toLowerCase())
      ))
    }

    /* Column으로 정렬 */
    if (sortableColumn.column && sortableColumn.order) {
      const { column, order } = sortableColumn;

      result = [...result].sort((a, b) => {
        const x = a[column];
        const y = b[column];

        /* priority로 정렬 */
        if (column === "priority") {
          const priorityRank: Record<TodoPriority, number> = {
            high: 3,
            medium: 2,
            low: 1
          };
    
          const xx = priorityRank[x as TodoPriority];
          const yy = priorityRank[y as TodoPriority];
    
          return order === "asc"
            ? xx - yy
            : yy - xx;
        }

        /* status 로 정렬 */
        if (column === "status") {
          const statusRank: Record<TodoStatus, number> = {
            open: 1,
            close: 2,
            "in-progress": 3,
            pending: 4
          }

          const xx = statusRank[x as TodoStatus]
          const yy = statusRank[y as TodoStatus]

          return order == "asc"
            ? xx - yy
            : yy - xx;
        }

        /* 문자열로 정렬 */
        if (typeof x === "string" && typeof y === "string") {
          return order === "asc"
            ? x.localeCompare(y)
            : y.localeCompare(x);
        }

        return 0;
      });
    };

    return result;
  }

  /* 필터링 된 데이터의 페이지네이션 */
  const paginatedData = () => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredData().slice(start, end);
  };

  /* 다음 페이지 */
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  /* 이전 페이지 */
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  /* 특정 페이지 선택 */
  const handleSelectPage = (pageNumber: number) => {
    setPage(() => pageNumber);
  }

  /* 페이지당 항목 수 선택 */
  const handleSelectLimit = (newLimit: number) => {
    setLimit(() => newLimit);
    setPage(() => 1);
  }

  /* totalPages 업데이트 */
  useEffect(() => {
    setTotalPages(Math.ceil(filteredData().length / limit));
  }, [search, limit, data, filters, statusFilter, priorityFilter]);

  return {
    data: paginatedData(),
    page,
    limit,
    search,
    totalPages,
    filters,
    isFilterd,
    statusFilter,
    priorityFilter,
    sortableColumn,
    handleSearchChange,
    handleUpdateFilter,
    handleResetFilters,
    handleStatusFilter,
    handlePriorityFilter,
    handleNextPage,
    handlePrevPage,
    handleSelectPage,
    handleSelectLimit,
    handleSortByColumn,
  }
}
