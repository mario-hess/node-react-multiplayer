import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

// @route         GET auth/refresh-token
// @desc          refresh JWT
// @access        public
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) {
      const error: any = new Error('No token sent, authorization denied')
      error.statusCode = 401
      throw error
    }

    const decoded: any = jwt.verify(token, process.env.REFRESH_SECRET as string)

    const payload = {
      user: {
        id: decoded.user._id,
        email: decoded.user.email,
        username: decoded.user.username,
      },
    }

    const loadedUser = await User.findOne({
      email: decoded.user.email,
    }).select('-password')

    if (!loadedUser) {
      const error: any = new Error('A user with this email could not be found')
      error.statusCode = 401
      throw error
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 60 }, //1m
      (error, token) => {
        if (error) {
          const error: any = new Error('Error signing authorization token')
          error.statusCode = 401
          throw error
        }
        const expiresIn = 60 //1m

        res.status(201).json({
          token,
          expiresIn,
          user: loadedUser,
        })
      }
    )
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default refreshToken
