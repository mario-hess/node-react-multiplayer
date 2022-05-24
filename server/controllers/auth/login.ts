import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

// @route         POST auth/login
// @desc          login user
// @access        public
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken as string

    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET as string)
      const error: any = new Error('User is already authenticated')
      error.statusCode = 401
      throw error
    }

    const { email, password } = req.body

    const loadedUser = await User.findOne({ email })

    if (!loadedUser) {
      const error: any = new Error('A user with this email could not be found')
      error.statusCode = 401
      throw error
    }

    const isEqual = await bcrypt.compare(
      password.toString(),
      loadedUser.password
    )

    if (!isEqual) {
      const error: any = new Error('Passwords do not match')
      error.statusCode = 401
      throw error
    }

    loadedUser.password = undefined

    const payload = {
      user: loadedUser,
    }

    jwt.sign(
      payload,
      process.env.REFRESH_SECRET as string,
      { expiresIn: 60 },
      (error, token) => {
        if (error) {
          const error: any = new Error('Error signing authorization token')
          error.statusCode = 401
          throw error
        }

        res.cookie('refreshToken', token, {
          expires: new Date(Date.now() + 129600000), // 36h
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        })
        res.status(201).json({ user: loadedUser })
      }
    )
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default login
