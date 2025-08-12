import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const zonesRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.zone.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        instructors: true,
        vehicles: true,
        addresses: true,
      }
    })
  }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      polygonGeoJson: z.any(),
      color: z.string().default('#0E7C86'),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.zone.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
