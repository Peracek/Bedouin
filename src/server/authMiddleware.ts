import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { APIError } from 'api/APIError';

const authMiddleware: RequestHandler = (req, res, next) => {
  // websocket connection are not authenticated
  if(req.url.endsWith('.websocket')) {
    next()
    return
  }

  const { authorization } = req.headers
  if(!authMiddleware) {
    next(new APIError({ status: 403 }))
  }
  const payload = jwt.decode(authorization!.split(' ')[1])
  if(!payload) {
    next(new APIError({ status: 500 }))
  }
  const { name, email } = payload as any
  req.user =  { name, email }
  next()
}

export default authMiddleware