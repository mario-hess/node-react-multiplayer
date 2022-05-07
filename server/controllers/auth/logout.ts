import { Request, Response, NextFunction } from 'express'

// @route         GET logout
// @desc          logout user
// @access        private

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('refreshToken', {
      expires: new Date(Date.now()),
    })

    res.status(201).json({ message: 'User successfully logged out' })
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default logout
