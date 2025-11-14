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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { buildError } from "@/lib/utils";
import { useToast } from "@/hooks/toast-hook";
import { createTodoAction, CreateTodoActionResult } from "@/lib/actions/todo-actions";
import { todoStatusOptions, todoPriorityOptions } from "@/constants/todo";

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

          <div className="space-y-2">
						{/* Title 입력 */}
						<div>
							<Label htmlFor="todo-create-form-title">Title</Label>
							<Input 
								type="text"
								id="todo-create-form-title"
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
          </div>

					{/* Status 선택 */}
					<div>
						<Label htmlFor="todo-create-form-status">Status</Label>
						<Select
							name="status"
							disabled={isPending}
							aria-invalid={state && !state?.success && state.errors.status ? "true" : "false"}
							aria-describedby={state && !state?.success && state.errors.status ? "status-error" : undefined}
						>
							<SelectTrigger id="todo-create-form-status" className="w-full">
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								{ todoStatusOptions.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* 오류 메시지 */}
						{state && !state.success && state.errors.status && (
							<p className="text-sm text-red-600" id="status-error">
								{state.errors.status.join(" ") }
							</p>
						)}
					</div>

					{/* Priority 선택 */}
					<div>
						<Label htmlFor="todo-create-form-priority">Priority</Label>
						<Select
							name="priority"
							disabled={isPending}
							aria-invalid={state && !state?.success && state.errors.priority ? "true" : "false"}
							aria-describedby={state && !state?.success && state.errors.priority ? "priority-error" : undefined}
						>
							<SelectTrigger id="todo-create-form-priority" className="w-full">
								<SelectValue placeholder="Select a priority" />
							</SelectTrigger>
							<SelectContent>
								{ todoPriorityOptions.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* 오류 메시지 */}
						{state && !state.success && state.errors.priority && (
							<p className="text-sm text-red-600" id="priority-error">
								{state.errors.priority.join(" ") }
							</p>
						)}
					</div>

					{/* 저장 & 닫기 버튼 */}
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
