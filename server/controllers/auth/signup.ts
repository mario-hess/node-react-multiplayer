import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

// @route         POST auth/signup
// @desc          sign up user
// @access        public
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET as string)
      const error: any = new Error('User is already authenticated')
      error.statusCode = 401
      throw error
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const error: any = new Error('Validation failed')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }

    const { email, username, password, confirmPassword } = req.body

    if (password != confirmPassword) {
      const error: any = new Error('Passwords do not match')
      error.statusCode = 401
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      email,
      username,
      password: hashedPassword,
    })

    await user.save()
    console.log('User created')
    res.status(201).json({ message: 'User created' })
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default signup
