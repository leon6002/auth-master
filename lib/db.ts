import { PrismaClient } from "@prisma/client";

// every time when nextjs hot reload, it will create a new instance of PrismaClient,
// this global declaration is necessary to prevent multiple instances of PrismaClient in dev environment

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
