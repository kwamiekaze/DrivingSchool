import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.userId) return null
    
    return await ctx.db.user.findUnique({
      where: { clerkId: ctx.session.userId },
      include: { organization: true }
    })
  }),
})
