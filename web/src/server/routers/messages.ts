import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { MessageType, MessageChannel } from '@prisma/client'

export const messagesRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.organizationId) throw new Error('Organization required')
    
    return await ctx.db.message.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        student: true,
        lesson: true,
      },
      orderBy: { createdAt: 'desc' }
    })
  }),

  send: protectedProcedure
    .input(z.object({
      studentId: z.string().optional(),
      lessonId: z.string().optional(),
      type: z.nativeEnum(MessageType),
      channel: z.nativeEnum(MessageChannel),
      recipient: z.string(),
      subject: z.string().optional(),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.organizationId) throw new Error('Organization required')
      
      return await ctx.db.message.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        }
      })
    }),
})
