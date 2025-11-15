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
  isFilterd: boolean;

  sortableColumn: {
    column: keyof Todo | null;
    order: "asc" | "desc" | null;
  };

  /* 액션 */
  initialize: (options: TodoListDataOptions) => void;
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
  isFilterd: false,

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

  handleResetFilters: () => {
    const { dataCount } = get();
    set({
      search: "",
      statusFilter: [],
      priorityFilter: [],
      filters: {},
      isFilterd: false,
      totalPages: Math.ceil(dataCount / 5),
      page: 1,
    });
  },

  handleSearchChange: (value) => {
    const { filters, statusFilter, priorityFilter } = get();
    set({
      page: 1,
      search: value,
      isFilterd:
        value.length > 0 ||
        Object.keys(filters).length > 0 ||
        statusFilter.length > 0 ||
        priorityFilter.length > 0,
    });
  },

  handleStatusFilter: (value) => {
    const { search, filters, priorityFilter, statusFilter } = get();

    const newFilters = statusFilter.includes(value)
      ? statusFilter.filter((x) => x !== value)
      : [...statusFilter, value];

    set({
      page: 1,
      statusFilter: newFilters,
      isFilterd:
        search.length > 0 ||
        Object.keys(filters).length > 0 ||
        newFilters.length > 0 ||
        priorityFilter.length > 0,
    });
  },

  handlePriorityFilter: (value) => {
    const { search, filters, statusFilter, priorityFilter } = get();

    const newFilters = priorityFilter.includes(value)
      ? priorityFilter.filter((x) => x !== value)
      : [...priorityFilter, value];

    set({
      page: 1,
      priorityFilter: newFilters,
      isFilterd:
        search.length > 0 ||
        Object.keys(filters).length > 0 ||
        statusFilter.length > 0 ||
        newFilters.length > 0,
    });
  },

  handleUpdateFilter: (key, value) => {
    set({
      page: 1,
      filters: {
        ...get().filters,
        [key]: value,
      },
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
    const {
      initialData,
      search,
      filters,
      statusFilter,
      priorityFilter,
      sortableColumn,
      defaultSearchKey,
    } = get();

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

      result = [...result].sort((a, b) => {
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
