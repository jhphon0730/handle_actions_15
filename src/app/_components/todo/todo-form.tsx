"use client";

import { useEffect } from "react";
import { useActionState } from "react";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
        >Add Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={createFormAction} className="space-y-2">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>
              ex: Buy groceries, Walk the dog, etc.
            </DialogDescription>
          </DialogHeader>

          <form action={createFormAction}></form>
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              type="text"
              id="title"
              name="title"
              placeholder=""
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
          {/* TODO: Selectbox Status */}

          {/* TODO: Selectbox Priority */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit" variant="default">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}