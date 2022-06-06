import { Server, Socket } from 'socket.io'
import { World, Body, Sphere, Box, Vec3 } from 'cannon-es'

import { world, buildWorld } from './world'
import {
  authenticateConnection,
  onClientDisconnect,
  connectedClients,
} from './server-engine'

const physicsTick = (io: Server<any>) => {
  const tick = () => {
    setImmediate(tick)

    world.fixedStep()

    const clientData = connectedClients.map((client) => {
      return {
        username: client.username,
        position: client.body?.position,
        rotation: client.body?.quaternion,
      }
    })
    io.emit('clients', clientData)
  }
  tick()
}

const createPlayerBody = (world: World, socketId: string) => {
  const size = 1 // m
  const halfExtents = new Vec3(size, size, size)
  const boxShape = new Box(halfExtents)
  const boxBody = new Body({ mass: 1, shape: boxShape })

  boxBody.position.set(Math.floor(Math.random() * 10) - 5, 10, 0) // m
  world.addBody(boxBody)

  const index = connectedClients.findIndex((userObject) => {
    return userObject.socketId === socketId
  })

  connectedClients[index].body = boxBody
}

export const init = (io: Server<any>) => {
  buildWorld()
  authenticateConnection(io)

  io.on('connection', (socket: Socket) => {
    console.log('Client connected')
    createPlayerBody(world, socket.id)

    onClientDisconnect(socket)
  })

  physicsTick(io)
}
