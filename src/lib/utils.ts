import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const buildError = (errors: Record<string, string[]>): string => {
  const filedErrors = Object.entries(errors)
    .filter(([key]) => key !== "_form")
    .flatMap(([, message]) => message)

  // 전체 오류 메시지에 _form 오류가 있으면 추가
  if (errors._form) {
    filedErrors.unshift(...errors._form);
  }

  return filedErrors.join(" ");
}