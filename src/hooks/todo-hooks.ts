"use client";

import { useState, useEffect } from "react";

import { type Todo } from "@/lib/types";

type TodoListDataOptions = {
  initialData: Todo[];
  dataCount: number;
  defaultSearchKey?: keyof Todo;
}

export const useTodoHooks = ({initialData, dataCount, defaultSearchKey}: TodoListDataOptions) => {
  const [data] = useState(initialData);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(dataCount / limit));

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ [key in keyof Todo]?: string }>({});
  const [isFilterd, setIsFilterd] = useState<boolean>(false);

  /* 필터 초기화 */
  const handleResetFilters = () => {
    setPage(() => 1)
    setSearch(() => "");
    setStatusFilter(() => [])
    setFilters({});
    setIsFilterd(() => false)
  }

  /* 검색 */
  const handleSearchChange = (value: string) => {
    setSearch(() => value)
    setPage(() => 1)
    setIsFilterd(() => value.length > 0)
  }

  /* status 필터 추가/제거 */
  const handleAddStatusFilter = (value: string) => {
    setStatusFilter((prev) => {
      const newFilters = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      setIsFilterd(newFilters.length > 0 || search.length > 0 || Object.values(filters).some(f => f.length > 0));
      setPage(() => 1);
      return newFilters;
    });
  }

  /* 필터링 추가 */
  const handleUpdateFilter = (key: keyof Todo, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(() => 1)
    setIsFilterd(() => true)
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
  }, [filters, search, limit, data, statusFilter]);

  return {
    data: paginatedData(),
    page,
    limit,
    search,
    totalPages,
    filters,
    isFilterd,
    statusFilter,
    handleSearchChange,
    handleUpdateFilter,
    handleResetFilters,
    handleAddStatusFilter,
    handleNextPage,
    handlePrevPage,
    handleSelectPage,
    handleSelectLimit,
  }
}