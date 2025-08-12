import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const reportsRouter = router({
  getRevenue: protectedProcedure
    .input(z.object({
      startDate: z.string().transform(str => new Date(str)),
      endDate: z.string().transform(str => new Date(str)),
    }))
    .query(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      const orders = await ctx.db.order.findMany({
        where: {
          organizationId: ctx.organizationId,
          status: 'PAID',
          createdAt: {
            gte: input.startDate,
            lte: input.endDate,
          }
        },
        include: { package: true }
      })
      
      return {
        totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
        orderCount: orders.length,
        orders
      }
    }),

  getUtilization: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    const instructors = await ctx.db.instructor.findMany({
      where: { organizationId: ctx.organizationId },
      include: { lessons: true }
    })
    
    const vehicles = await ctx.db.vehicle.findMany({
      where: { organizationId: ctx.organizationId },
      include: { lessons: true }
    })
    
    return { instructors, vehicles }
  }),
})
