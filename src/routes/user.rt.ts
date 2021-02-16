import { loginCtrl, loginFields, refreshLogin } from 'controllers/user/auth/login.ctrl'
import { Router } from 'express'

const router = Router()

// Auth
router.post('/login', loginFields, loginCtrl)
router.get('/login', refreshLogin)

router.post('/signup')
