import { initTRPC, TRPCError } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getAuth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import superjson from 'superjson'
import { ZodError } from 'zod'

interface CreateContextOptions {
  session: any
  organizationId: string | null
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    organizationId: opts.organizationId,
    db,
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req } = opts
  const session = getAuth(req)
  
  const organizationId = session.orgId || null

  return createInnerTRPCContext({
    session,
    organizationId,
  })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, userId: ctx.session.userId },
      organizationId: ctx.organizationId,
      db: ctx.db,
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
export const router = t.router
