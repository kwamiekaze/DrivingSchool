import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'

import { appRouter } from '@/server/routers/_app'
import { createTRPCContext } from '@/server/trpc'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ req, resHeaders }) => createTRPCContext({ 
      req, 
      resHeaders,
      info: { 
        isBatchCall: false, 
        calls: [],
        accept: 'application/jsonl',
        type: 'query',
        connectionParams: {},
        signal: new AbortController().signal,
        url: new URL(req.url)
      }
    }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            )
          }
        : undefined,
  })

export { handler as GET, handler as POST }
