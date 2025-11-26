// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // evita múltiplas instâncias no hot reload do Next.js
  var __PRISMA_CLIENT__: PrismaClient | undefined;
}

export const prisma =
  global.__PRISMA_CLIENT__ ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") global.__PRISMA_CLIENT__ = prisma;
