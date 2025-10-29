"use client";

import type React from "react"
import { useEffect } from "react";
import { useActionState } from "react";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { buildError } from "@/lib/utils";
import { useToast } from "@/hooks/toast-hook";
import { createCategoryAction, CreateCategoryActionResult } from "@/lib/actions/category-actions";

export const CategoryCreateForm = () => {
  const { showSuccess, showError } = useToast();
  const [state, createFormAction, isPending] = useActionState<CreateCategoryActionResult | null, FormData>(createCategoryAction, null)

  useEffect(() => {
    if (!state) {
      return;
    }
    
    // 성공 시에
    if (state.success) {
      showSuccess(`Category "${state.category.name}" created successfully.`);
      return;
    }

    const errorMsg = buildError(state.errors)
    showError(errorMsg);
  }, [state, showSuccess, showError]);

  return (
    <form className="space-y-4" action={createFormAction}>
      {/* name */}
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="ex) Work, Personal, etc."
          disabled={isPending}
          aria-invalid={state && !state?.success && state.errors.name ? "true" : "false"}
          aria-describedby={state && !state?.success && state.errors.name ? "name-error" : undefined}
        />
        { state && !state.success && state.errors.name && (
          <p className="text-sm text-red-600" id="name-error">
            {state.errors.name.join(" ") }
          </p>
        )}
      </div>
      
      {/* color */}
      <div className="space-y-2">
        <Label htmlFor="color">Category Color</Label>
        <Input
          type="text"
          id="color"
          name="color"
          placeholder="ex) #ff0000"
          disabled={isPending}
          aria-invalid={state && !state?.success && state.errors.color ? "true" : "false"}
          aria-describedby={state && !state?.success && state.errors.color ? "color-error" : undefined}
        />
        { state && !state.success && state.errors.color && (
          <p className="text-sm text-red-600" id="color-error">
            {state.errors.color.join(" ") }
          </p>
        )}
      </div>

      {/* 사용 팁 */}
      <div className="rounded-md bg-muted p-4 space-y-2">
        <h3 className="font-semibold text-sm">Tips.</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• The name must be between 2 and 50 characters.</li> 
          <li>• The color must be in HEX code format (e.g., #FF5733).</li>
        </ul>
      </div>
      
      <Button type="submit" disabled={isPending}>
        { isPending && "Creating..." }
        { !isPending && "Create Category" }
      </Button>
    </form>
  )
}