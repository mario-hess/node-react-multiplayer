import { Server, Socket } from 'socket.io'
import { Body } from 'cannon-es'
import jwt from 'jsonwebtoken'

import { world } from './world'

export const connectedClients: User[] = []

type User = {
  socketId: string
  userId: string
  username: string
  body?: Body
}

export const authenticateConnection = (io: Server<any>) => {
  // authenticate user
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token?.split(' ')[1]
      if (!token) {
        const error: any = new Error('No token sent, authorization denied')
        error.statusCode = 401
        next(error)
        throw error
      }
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

      const user: User = {
        socketId: socket.id,
        userId: decoded.user.id,
        username: decoded.user.username,
      }

      // remove user from the array if already present in the connectedClients[]
      if (connectedClients.some(({ socketId }) => socketId === user.socketId)) {
        const index = connectedClients.findIndex((userObject) => {
          return userObject.socketId === user.socketId
        })

        connectedClients.splice(index, 1)
      }

      connectedClients.push(user)

      next()
    } catch (error) {
      console.log(error)
    }
  })
}

export const onClientDisconnect = (socket: Socket) => {
  socket.on('disconnect', () => {
    const index = connectedClients.findIndex((userObject) => {
      return userObject.socketId === socket.id
    })
    world.removeBody(connectedClients[index].body!)
    connectedClients.splice(index, 1)

    console.log('Client Disconnected')
    console.log(connectedClients)
  })
}

export const getConnectedClientByUserId = (userId: string) => {
  const index = connectedClients.findIndex((userObject) => {
    return userObject.userId === userId
  })
  return connectedClients[index]
}

export const getConnectedClientBySocketId = (socketId: string) => {
  const index = connectedClients.findIndex((userObject) => {
    return userObject.socketId === socketId
  })
  return connectedClients[index]
}
