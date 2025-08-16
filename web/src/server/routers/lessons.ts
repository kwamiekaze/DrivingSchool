import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const lessonsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.lesson.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        student: true,
        instructor: true,
        vehicle: true,
        order: {
          include: {
            package: true,
          },
        },
        pickupAddress: {
          include: {
            zone: true,
          },
        },
        dropoffAddress: {
          include: {
            zone: true,
          },
        },
      },
      orderBy: { startTime: 'asc' }
    })
  }),

  getByDate: protectedProcedure
    .input(z.object({ 
      date: z.string().transform(str => new Date(str))
    }))
    .query(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      const startOfDay = new Date(input.date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(input.date)
      endOfDay.setHours(23, 59, 59, 999)
      
      return await ctx.db.lesson.findMany({
        where: { 
          organizationId: ctx.organizationId,
          startTime: { gte: startOfDay, lte: endOfDay }
        },
        include: {
          student: true,
          instructor: true,
          vehicle: true,
          order: {
            include: {
              package: true,
            },
          },
          pickupAddress: {
            include: {
              zone: true,
            },
          },
          dropoffAddress: {
            include: {
              zone: true,
            },
          },
        },
        orderBy: { startTime: 'asc' }
      })
    }),

  updateTime: protectedProcedure
    .input(z.object({
      id: z.string(),
      startTime: z.string().transform(str => new Date(str)),
      endTime: z.string().transform(str => new Date(str)),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.lesson.update({
        where: { 
          id: input.id,
          organizationId: ctx.organizationId 
        },
        data: {
          startTime: input.startTime,
          endTime: input.endTime,
        }
      })
    }),
})
