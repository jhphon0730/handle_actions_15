"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TodoTableBodyCell, TodoTableHeadCell } from "@/app/_components/todo/todo-table-cell";
import { TodoToolbar } from "@/app/_components/todo/todo-toolbar"
import { TodoPagination } from "@/app/_components/todo/todo-pagination";

import { Todo } from "@/lib/types";
import { useTodoHooks } from "@/hooks/todo-hooks";

type TodoTableProps = {
  todos: Todo[];
  totalCount: number;
  todoHeaders: string[];
}

export const TodoTable = ({ todos, totalCount, todoHeaders}: TodoTableProps) => {
  const {
    data,
    page,
    limit,
    totalPages,
    search,
    isFilterd,
    statusFilter,
    priorityFilter,
    sortableColumn,
    handleResetFilters,
    handleStatusFilter,
    handlePriorityFilter,
    handleNextPage,
    handlePrevPage,
    handleSelectPage,
    handleSelectLimit,
    handleSearchChange,
    handleSortByColumn,
  } = useTodoHooks({ initialData: todos, dataCount: totalCount, defaultSearchKey: "title" });
  return (
    <div className="flex flex-col gap-2">
      {/* 툴바 */}
      <TodoToolbar 
        isFilterd={isFilterd}
        searchData={search}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={handleSearchChange}
        onStatusFilter={handleStatusFilter}
        onPriorityFilter={handlePriorityFilter}
        onResetFilters={handleResetFilters}
      />

      {/* 전체 목록 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {todoHeaders.length ? (
                todoHeaders.map((header) => (
                  <TodoTableHeadCell
                    key={header}
                    cellData={header}
                    sortableColumn={sortableColumn}
                    handleSortByColumn={handleSortByColumn}
                  />
                ))
              ) : (
                <span>No Headers</span>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((todo) => (
                <TableRow key={todo.id}>
                  <TodoTableBodyCell
                    cellData={`Todo-${todo.id.slice(-5)}`}
                  />
                  <TodoTableBodyCell 
                    cellData={todo.title}
                  />
                  <TodoTableBodyCell 
                    cellData={todo.status}
                  />
                  <TodoTableBodyCell 
                    cellData={todo.priority}
                  />
                  <TodoTableBodyCell 
                    cellData={todo.createdAt.toLocaleString("ko-KR", { timeZone: "UTC" })}
                  />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                >No Todos.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <TodoPagination
        page={page}
        limit={limit}
        totalPages={totalPages}
        totalCount={totalCount}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onSelectPage={handleSelectPage}
        onSelectLimit={handleSelectLimit}
      />
    </div>
  )
}
