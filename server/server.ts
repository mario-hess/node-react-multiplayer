import express, { Request, Response, NextFunction } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { tick } from './game/game'
import { socketHandle } from './socket/socket-handle'

import authRoutes from './routes/auth'
import { init } from './engine/game-engine'

const PORT = (process.env.PORT as string) ?? 5000

dotenv.config({ path: './.env' })

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: `http://localhost:3000`, credentials: true }))
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.use('/auth', authRoutes)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error)

  res.status(error.statusCode ?? 500).json({
    message: error.message,
    data: error.data,
  })
})

init(io)

const connect = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Server successfully connected to database')

    // Start Server
    server.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`)
    })
  } catch (error) {
    console.log(`Connection failed with error: ${error}`)
  }
}

connect()
