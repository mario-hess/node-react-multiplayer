import express from 'express'
import { body } from 'express-validator'
import { auth } from './../middlewares/auth'

import User from './../models/user'

import signup from '../controllers/auth/signup'
import login from '../controllers/auth/login'
import checkUser from '../controllers/auth/check-user'
import refreshToken from '../controllers/auth/refresh-token'
import logout from '../controllers/auth/logout'
import user from '../controllers/auth/user'

const router = express.Router()

router.post(
  '/signup',
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (value: any, { req }: any) => {
      const userDocument = await User.findOne({ email: value })

      if (userDocument) return Promise.reject('Email address already exists')
    }),
  body('password').trim().not().isEmpty(),

  signup
)

router.post('/login', login)
router.get('/check-user', checkUser)
router.get('/refresh-token', refreshToken)
router.get('/logout', auth, logout)
router.get('/user', auth, user)

export default router
