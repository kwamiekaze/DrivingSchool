import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { PackageType } from '@prisma/client'

export const packagesRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.package.findMany({
      where: { organizationId: ctx.organizationId, isActive: true },
      orderBy: { price: 'asc' }
    })
  }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      hours: z.number(),
      price: z.number(),
      packageType: z.nativeEnum(PackageType),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.package.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
