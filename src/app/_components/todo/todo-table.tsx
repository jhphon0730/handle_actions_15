"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TodoTableBodyCell,
  TodoTableHeadCell,
} from "@/app/_components/todo/todo-table-cell";
import { TodoToolbar } from "@/app/_components/todo/todo-toolbar";
import { TodoPagination } from "@/app/_components/todo/todo-pagination";

import type { Todo } from "@/lib/types";
import { useTodoStore } from "@/store/useTodoStore";

type TodoTableProps = {
  todos: Todo[];
  totalCount: number;
  todoHeaders: string[];
};

export const TodoTable = ({
  todos,
  totalCount,
  todoHeaders,
}: TodoTableProps) => {
  const { initialize, paginatedData } = useTodoStore();

  const data = paginatedData();

  useEffect(() => {
    initialize({
      initialData: todos,
      dataCount: totalCount,
      defaultSearchKey: "title",
    });
  }, [todos, totalCount, initialize]);

  return (
    <div className="flex flex-col gap-2">
      {/* 툴바 */}
      <TodoToolbar />

      {/* 전체 목록 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {todoHeaders.length ? (
                todoHeaders.map((header) => (
                  <TodoTableHeadCell key={header} cellData={header} />
                ))
              ) : (
                <span>No Headers</span>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.tableData.length ? (
              data.tableData.map((todo) => (
                <TableRow key={todo.id}>
                  <TodoTableBodyCell
                    cellType="#"
                    cellData={`Todo-${todo.id.slice(-5)}`}
                  />
                  <TodoTableBodyCell cellType="title" cellData={todo.title} />
                  <TodoTableBodyCell cellType="status" cellData={todo.status} />
                  <TodoTableBodyCell
                    cellType="priority"
                    cellData={todo.priority}
                  />
                  <TodoTableBodyCell
                    cellType="createdAt"
                    cellData={todo.createdAt.toLocaleString("ko-KR", {
                      timeZone: "UTC",
                    })}
                  />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TodoTableBodyCell
                  cellType="#"
                  cellData="No Todos."
                  className="h-24 text-center"
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <TodoPagination filterdDataCount={data.filterdDataCount} />
    </div>
  );
};
