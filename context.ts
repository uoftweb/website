import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth/client";

export type WDCSession = Session & { user: { id: number } };

export type Context = {
  prisma: PrismaClient;
  session: WDCSession;
};
