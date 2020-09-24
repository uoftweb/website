import { PrismaClient } from "@prisma/client";

/**
 * Prisma may start opening too many database connections in local
 * development mode (e.g. due to Hot Module Reloading), so we use
 * this approach when initalising the Prisma Client:
 */
export function getPrisma() {
  let prisma;

  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }

  return prisma;
}
