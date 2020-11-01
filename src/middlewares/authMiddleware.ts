import JWT from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import { AUTH_COOKIE_KEY } from '../constants'
import { APIError } from '../utilities/APIError'
import { UNAUTHORIZED_REQUEST } from '../utilities/errorConstants'
import { jwtSecretKey } from '../config'
import { logger } from '../utilities/logger'


export const verifyJwtToken=async (
    req:Request,
    res:Response,
    next:NextFunction
  ): Promise<void>=> {
      const token = req.cookies[AUTH_COOKIE_KEY]
    try {
       
        if(!token) return next(new APIError(401,UNAUTHORIZED_REQUEST))

      const verified = JWT.verify(token,jwtSecretKey) as {
        id: string;
        iat: number;
        exp: number;
        userType:number
      };

      if(!verified) return next(new APIError(401,UNAUTHORIZED_REQUEST))
      
      req.body.id=verified.id
      req.body.userType= verified.userType
      next()
    } catch (err) {
        logger.error(`Unauthenticated Request with token ${token}`)
        return next(new APIError(401,UNAUTHORIZED_REQUEST))

     }
  }