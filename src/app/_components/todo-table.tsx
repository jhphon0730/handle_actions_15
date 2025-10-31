import { Spinner } from "@/components/ui/spinner";
import { Table } from "@/components/ui/table";

import { Todo } from "@/lib/types";

type TodoTableProps = {
  todos: Todo[];
  isOutOfRange: boolean;
}

export const TodoTable = async ({ todos, isOutOfRange }: TodoTableProps) => {
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
    <div className="flex flex-col gap-4 mt-4">
    {/* 전체 목록 */}
    {/* 검색 및 필터링 / Toolbar */}

    {/* 데이터 테이블 */}
    <Table>
      {/* Header 컴포넌트 */}

      {/* Body 컴포넌트 */}
    </Table>

    </div>
  )
}
