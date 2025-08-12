import { router } from '../trpc'
import { authRouter } from './auth'
import { studentsRouter } from './students'
import { instructorsRouter } from './instructors'
import { vehiclesRouter } from './vehicles'
import { zonesRouter } from './zones'
import { packagesRouter } from './packages'
import { ordersRouter } from './orders'
import { lessonsRouter } from './lessons'
import { messagesRouter } from './messages'
import { reportsRouter } from './reports'

export const appRouter = router({
  auth: authRouter,
  students: studentsRouter,
  instructors: instructorsRouter,
  vehicles: vehiclesRouter,
  zones: zonesRouter,
  packages: packagesRouter,
  orders: ordersRouter,
  lessons: lessonsRouter,
  messages: messagesRouter,
  reports: reportsRouter,
})

export type AppRouter = typeof appRouter
