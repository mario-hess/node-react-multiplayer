import { Response, NextFunction } from 'express'
import User from '../../models/user'

// @route         GET auth/user
// @desc          get user data
// @access        private
const user = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json(user?.email)
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default user
