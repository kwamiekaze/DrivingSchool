import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const instructorsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.instructor.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        homeZone: true,
        lessons: { 
          where: { 
            startTime: { gte: new Date() } 
          },
          take: 10,
          orderBy: { startTime: 'asc' }
        }
      }
    })
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.instructor.findFirst({
        where: { 
          id: input.id,
          organizationId: ctx.organizationId 
        },
        include: {
          homeZone: true,
          lessons: { 
            include: { 
              student: true, 
              vehicle: true,
              pickupAddress: true,
              dropoffAddress: true 
            } 
          }
        }
      })
    }),

  create: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      licenseNumber: z.string(),
      homeZoneId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.instructor.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
