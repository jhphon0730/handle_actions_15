"use client";

import { create } from "zustand";
import type { Todo, TodoPriority, TodoStatus } from "@/lib/types";

type TodoListDataOptions = {
  initialData: Todo[];
  dataCount: number;
  defaultSearchKey?: keyof Todo;
};

type TodoStore = {
  /* 원본 옵션 */
  initialData: Todo[];
  dataCount: number;
  defaultSearchKey?: keyof Todo;

  /* 상태 */
  page: number;
  limit: number;
  totalPages: number;

  search: string;
  statusFilter: string[];
  priorityFilter: string[];
  filters: { [key in keyof Todo]?: string };
  isFiltered: boolean;

  sortableColumn: {
    column: keyof Todo | null;
    order: "asc" | "desc" | null;
  };

  /* 액션 */
  initialize: (options: TodoListDataOptions) => void;
  calculateIsFiltered: () => boolean;
  handleResetFilters: () => void;
  handleSearchChange: (value: string) => void;
  handleStatusFilter: (value: string) => void;
  handlePriorityFilter: (value: string) => void;
  handleUpdateFilter: (key: keyof Todo, value: string) => void;
  handleSortByColumn: (column: keyof Todo, order: "asc" | "desc") => void;

  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleSelectPage: (page: number) => void;
  handleSelectLimit: (limit: number) => void;

  /* 계산 결과 */
  filteredData: () => Todo[];
  paginatedData: () => {tableData: Todo[], filterdDataCount: number};
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  initialData: [],
  dataCount: 0,
  defaultSearchKey: "title",

  page: 1,
  limit: 5,
  totalPages: 1,

  search: "",
  statusFilter: [],
  priorityFilter: [],
  filters: {},
  isFiltered: false,

  sortableColumn: {
    column: null,
    order: null,
  },

  initialize: ({ initialData, dataCount, defaultSearchKey }) => {
    set({
      initialData,
      dataCount,
      defaultSearchKey: defaultSearchKey ?? "title",
      page: 1,
      limit: 5,
      totalPages: Math.ceil(dataCount / 5),
    });
    get().handleResetFilters();
  },

  calculateIsFiltered: () => {
    const { search, statusFilter, priorityFilter, filters } = get();
    return search.length > 0 || statusFilter.length > 0 || priorityFilter.length > 0 || Object.keys(filters).length > 0;
  },

  handleResetFilters: () => {
    const { dataCount } = get();
    set({
      search: "",
      statusFilter: [],
      priorityFilter: [],
      filters: {},
      isFiltered: false,
      totalPages: Math.ceil(dataCount / 5),
      page: 1,
    });
  },

  handleSearchChange: (value) => {
    const { calculateIsFiltered } = get();
    set({
      page: 1,
      search: value,
      isFiltered: calculateIsFiltered(),
    });
  },

  handleStatusFilter: (value) => {
    const { statusFilter, calculateIsFiltered } = get();

    const newFilters = statusFilter.includes(value)
      ? statusFilter.filter((x) => x !== value)
      : [...statusFilter, value];

    set({
      page: 1,
      statusFilter: newFilters,
      isFiltered: calculateIsFiltered(),
    });
  },

  handlePriorityFilter: (value) => {
    const { priorityFilter, calculateIsFiltered } = get();

    const newFilters = priorityFilter.includes(value)
      ? priorityFilter.filter((x) => x !== value)
      : [...priorityFilter, value];

    set({
      page: 1,
      priorityFilter: newFilters,
      isFiltered: calculateIsFiltered(),
    });
  },

  handleUpdateFilter: (key, value) => {
    const { calculateIsFiltered } = get();

    set({
      page: 1,
      filters: {
        ...get().filters,
        [key]: value,
      },
      isFiltered: calculateIsFiltered(),
    });
  },

  handleSortByColumn: (column, order) => {
    set({
      sortableColumn: { column, order },
    });
  },

  handleNextPage: () => {
    const { totalPages } = get();
    set((state) => ({
      page: Math.min(state.page + 1, totalPages),
    }));
  },

  handlePrevPage: () => {
    set((state) => ({
      page: Math.max(state.page - 1, 1),
    }));
  },

  handleSelectPage: (pageNumber) => {
    set({ page: pageNumber });
  },

  handleSelectLimit: (newLimit) => {
    const {dataCount} = get()
    set({
      limit: newLimit,
      page: 1,
      totalPages: Math.ceil(dataCount / newLimit)
    });
  },

  filteredData: () => {
    const state = get();
    const {
      initialData,
      search,
      filters,
      statusFilter,
      priorityFilter,
      sortableColumn,
      defaultSearchKey,
    } = state;

    // 현재 필터 상태를 문자열로 직렬화하여 캐시 키로 사용
    const currentFilterState = JSON.stringify({
      search,
      filters,
      statusFilter,
      priorityFilter,
      sortableColumn,
    });

    // 필터링 및 정렬 수행
    let result = [...initialData];

    if (search.length && defaultSearchKey) {
      result = result.filter((item) =>
        String(item[defaultSearchKey]).toLowerCase().includes(search.toLowerCase())
      );
    }

    for (const key in filters) {
      const value = filters[key as keyof Todo];
      if (value) {
        result = result.filter((item) =>
          String(item[key as keyof Todo]).toLowerCase().includes(value.toLowerCase())
        );
      }
    }

    if (statusFilter.length) {
      result = result.filter((item) =>
        statusFilter.includes(String(item.status).toLowerCase())
      );
    }

    if (priorityFilter.length) {
      result = result.filter((item) =>
        priorityFilter.includes(String(item.priority).toLowerCase())
      );
    }

    if (sortableColumn.column && sortableColumn.order) {
      const { column, order } = sortableColumn;

      // 6번 개선: 불필요한 배열 복사 제거 (이미 result는 복사본)
      result.sort((a, b) => {
        const x = a[column];
        const y = b[column];

        if (column === "priority") {
          const rank: Record<TodoPriority, number> = {
            high: 3,
            medium: 2,
            low: 1,
          };
          return order === "asc"
            ? rank[x as TodoPriority] - rank[y as TodoPriority]
            : rank[y as TodoPriority] - rank[x as TodoPriority];
        }

        if (column === "status") {
          const rank: Record<TodoStatus, number> = {
            open: 1,
            close: 2,
            "in-progress": 3,
            pending: 4,
          };
          return order === "asc"
            ? rank[x as TodoStatus] - rank[y as TodoStatus]
            : rank[y as TodoStatus] - rank[x as TodoStatus];
        }

        if (typeof x === "string" && typeof y === "string") {
          return order === "asc"
            ? x.localeCompare(y)
            : y.localeCompare(x);
        }

        return 0;
      });
    }

    return result;
  },

  paginatedData: () => {
    const { filteredData, page, limit } = get();

    const start = (page - 1) * limit;
    const filterdDataList = filteredData()
    const tableData = filterdDataList.slice(start, start + limit)

    return {
      tableData,
      filterdDataCount: filterdDataList.length
    };
  },
}))
