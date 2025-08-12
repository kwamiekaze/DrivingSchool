import { initTRPC, TRPCError } from '@trpc/server'
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getAuth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import superjson from 'superjson'
import { ZodError } from 'zod'

interface CreateContextOptions {
  session: { userId?: string; orgId?: string } | null
  organizationId: string | null
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    organizationId: opts.organizationId,
    db,
  }
}

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auth = getAuth(req as any)
    const organizationId = auth.orgId || null
    const session = auth.userId ? { userId: auth.userId, orgId: auth.orgId } : null

    return createInnerTRPCContext({
      session,
      organizationId,
    })
  } catch {
    return createInnerTRPCContext({
      session: null,
      organizationId: null,
    })
  }
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
