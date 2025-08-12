import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const ordersRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.order.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        student: true,
        package: true,
        lessons: true,
      },
      orderBy: { createdAt: 'desc' }
    })
  }),

  create: protectedProcedure
    .input(z.object({
      studentId: z.string(),
      packageId: z.string(),
      amount: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.order.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
