import GetPrismaClient from "@/lib/prisma";
import { initTRPC } from "@trpc/server";

export async function createTRPCContext() {
  const prisma = GetPrismaClient();

  return { prisma };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// Unauthenticated procedure. Once db/docs/ailene-os-ddl.sql defines auth
// tables (User, Role, Token), add a session-resolving context plus
// loggedInProcedure / roleBasedProcedure here, mirroring the sevenpreneur
// pattern (src/trpc/init.ts there).
export const baseProcedure = t.procedure;
