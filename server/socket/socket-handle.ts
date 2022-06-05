import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'

import { world } from '../game/game'
import { Body, Sphere } from 'cannon-es'

export const socketHandle = (io: Server<any>) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token?.split(' ')[1]
      if (!token) {
        const error: any = new Error('No token sent, authorization denied')
        error.statusCode = 401
        next(error)
        throw error
      }
      jwt.verify(token, process.env.JWT_SECRET as string)
      next()
    } catch (error) {
      console.log(error)
    }
  })

  io.on('connection', (socket) => {
    console.log('New Client connected')

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })

    console.log('emitting...')
    const radius = 1 // m
    const sphereBody = new Body({
      mass: 5, // kg
      shape: new Sphere(radius),
    })
    sphereBody.position.set(0, 10, 0) // m
    world.addBody(sphereBody)

    socket.emit('createPlayer', sphereBody.position, (response: any) => {
      console.log(response)
    })
  })
}
