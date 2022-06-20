import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      const error: any = new Error('No token sent, authorization denied')
      error.statusCode = 401
      throw error
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded.user

    next()
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 401
    next(error)
  }
}
