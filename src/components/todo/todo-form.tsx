"use client";

import { useEffect } from "react";
import { useActionState } from "react";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { buildError } from "@/lib/utils";
import { useToast } from "@/hooks/toast-hook";
import { createTodoAction, CreateTodoActionResult } from "@/lib/actions/todo-actions";

export const TodoCreateForm = () => {
  const { showSuccess, showError } = useToast();
  const [state, createFormAction, isPending] = useActionState<CreateTodoActionResult | null, FormData>(createTodoAction, null)

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      showSuccess(`Todo "${state.todo.title}" created successfully.`);
      return;
    }

    const errorMsg = buildError(state.errors)
    showError(errorMsg);
  }, [state, showSuccess, showError])

  return (
    <form className="space-y-4" action={createFormAction}>
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          type="text"
          id="title"
          name="title"
          placeholder="ex) Buy groceries, Walk the dog, etc."
          disabled={isPending}
          aria-invalid={state && !state?.success && state.errors.title ? "true" : "false"}
          aria-describedby={state && !state?.success && state.errors.title ? "title-error" : undefined}
        />
        {/* 오류 메시지 */}
        { state && !state.success && state.errors.title && (
          <p className="text-sm text-red-600" id="title-error">
            {state.errors.title.join(" ") }
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        { isPending && "Creating..."}
        { !isPending && "Create Todo" }
      </Button>
    </form>
  )
}