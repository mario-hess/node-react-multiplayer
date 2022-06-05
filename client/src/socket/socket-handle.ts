import { io, Socket } from 'socket.io-client'
import axios from 'axios'

export let socket: Socket | null

export const socketConnect = () => {
  if (socket) return

  socket = io(import.meta.env.VITE_BASEURL as string, {
    withCredentials: true,
    auth: {
      token: axios.defaults.headers.common['Authorization'],
    },
  })

  console.log(`Socket connected`)
}

export const socketDisconnect = () => {
  if (!socket) return
  socket.disconnect()
  console.log('Socket disconnected')
  socket = null
}
