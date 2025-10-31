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

/* 페이징 번호 배열 계산 함수 */
export const buildPaginationRange = (currentPage: number, totalCount: number, limit: number):  ((number | "...")[]) => {
  if (limit < 1) limit = 1;
  if (currentPage < 1) currentPage = 1;
  if (totalCount < 1) return [];

  const totalPage = Math.ceil(totalCount / limit);
  const maxVisibleCore = 5; // 최대 가운데 페이지 번호 개수
  const sideWindow = 1; // 현재 페이지 양쪽에 표시할 페이지 수

  /* 전체 페이지 수가 limit 이하인 경우 모든 페이지 번호 반환 */
  if (totalPage <= maxVisibleCore) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = []
  const firstPage = 1;
  const lastPage = totalPage;

  pages.push(firstPage);

  /* 가운데 페이지 범위 계산 */
  // - 현재 페이지 기준으로 좌우로 sideWindow 만큼의 페이지를 표시
  let start = Math.max(currentPage - sideWindow, 2);
  // - 마지막 페이지 바로 전까지 표시
  let end = Math.min(currentPage + sideWindow, totalPage - 1);

  /* 현재 페이지가 앞쪽(첫 페이지쪽)에 근접하면 윈도우를 오른쪽 (마지막 페이지쪽)으로 확장 */
  if (currentPage <= 3) {
    start = 2;
    end = 2 + sideWindow * 2;
  }

  /* 현재 페이지가 뒤쪽(마지막 페이지)에 근적하면 윈도우를 왼쪽 (첫 페이지쪽)으로 확장*/
  if (currentPage >= totalPage - 2) {
    start = totalPage - (2 + sideWindow * 2);
    end = totalPage - 1;
  }

  /* 시작 페이지가 2보다 크면 생략 부호 추가 */
  if (start > 2) {
    pages.push("...");
  }

  /* 가운데 페이지들 추가 */
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  /* 끝 페이지가 마지막 페이지 바로 전보다 작으면 생략 부호 추가 */
  if (end < totalPage -1) {
    pages.push("...");
  }

  pages.push(lastPage);
  return pages;
}