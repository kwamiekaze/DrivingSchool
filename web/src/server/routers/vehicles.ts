import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { VehicleType } from '@prisma/client'

export const vehiclesRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.vehicle.findMany({
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

  create: protectedProcedure
    .input(z.object({
      make: z.string(),
      model: z.string(),
      year: z.number(),
      licensePlate: z.string(),
      vin: z.string().optional(),
      vehicleType: z.nativeEnum(VehicleType),
      homeZoneId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.vehicle.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
