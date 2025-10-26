"use client";

import type React from "react"
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CategoryCreateForm = () => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isPending, startTransition] = useTransition()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  }

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(() => e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !color.trim()) {
      toast("Please fill in all fields");
      return;
    };

    startTransition(async () => {
      console.log("TODO")
    });
  }

  return (
    <form className="flex gap-2">
      {/* name */}
      <Input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={handleChangeName}
        disabled={isPending}
      />
      {/* color */}
      <Input
        type="text"
        placeholder="Category Color"
        value={color}
        onChange={handleChangeColor}
        disabled={isPending}
      />
      <Button type="submit" onClick={handleSubmit}>Add Category</Button>
    </form>
  )
}