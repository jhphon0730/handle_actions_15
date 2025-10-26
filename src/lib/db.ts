import { PrismaClient } from "@/generated/prisma"

// 리로딩 기능으로 인해 PrismaClient 인스턴스가 여러 번 생성되는 것을 방지
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// PrismaClient 인스턴스 생성 또는 재사용
export const db = globalForPrisma.prisma ?? new PrismaClient()

// 개발 환경에서는 전역 객체에 PrismaClient 인스턴스를 저장하여 재사용
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
