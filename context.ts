import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth/client";

export type WDCSession = Session & { id: number };

export type Context = {
  prisma: PrismaClient;
  session: WDCSession;
};
