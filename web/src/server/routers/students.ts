import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const studentsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.student.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        pickupAddress: true,
        dropoffAddress: true,
        orders: true,
        lessons: { take: 5, orderBy: { startTime: 'desc' } }
      }
    })
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.student.findFirst({
        where: { 
          id: input.id,
          organizationId: ctx.organizationId 
        },
        include: {
          pickupAddress: true,
          dropoffAddress: true,
          orders: { include: { package: true } },
          lessons: { include: { instructor: true, vehicle: true } },
          progressEntries: true
        }
      })
    }),

  create: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string().optional(),
      parentEmail: z.string().email().optional(),
      parentPhone: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.student.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
