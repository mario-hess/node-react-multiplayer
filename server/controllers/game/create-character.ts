import { Request, Response, NextFunction } from 'express'

const createCharacter = async (req: any, res: Response, next: NextFunction) => {
  try {
    console.log(req.user)
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500
    next(error)
  }
}

export default createCharacter
