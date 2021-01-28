import { Router } from 'express'
import { isDev } from '@utils/config'

// Routes
import TestRts from './testRoutes'

const router = Router()

if (isDev) {
  router.use('/test', TestRts)
}

export default router
