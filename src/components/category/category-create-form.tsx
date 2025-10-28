"use client";

import type React from "react"
import { useActionState } from "react";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createCategoryAction, CreateCategoryActionResult } from "@/lib/actions/category-actions";

export const CategoryCreateForm = () => {
  const [state, createFormAction, isPending] = useActionState<CreateCategoryActionResult | null, FormData>(createCategoryAction, null)

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
      <div>
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
      
      <Button 
        type="submit"
        disabled={isPending}
      >Add Category</Button>
    </form>
  )
}