import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// @route         GET auth/check-user
// @desc          check if the user is logged in
// @access        public
const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET as string)
      const error: any = new Error('Client already authenticated')
      error.statusCode = 401
      throw error
    }

    res.status(200).json({
      message: 'Client is allowed to authenticate',
    })
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default checkUser
