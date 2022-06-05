import { useState, useEffect } from 'react'
import {
  socket,
  socketConnect,
  socketDisconnect,
} from '../../../socket/socket-handle'

interface ComponentProps {
  setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const Game = ({ setIsLoadingAuth }: ComponentProps) => {
  useEffect(() => {
    console.log('Rendering Game')
    socketConnect()

    socket!.on('createPlayer', (arg: any, callback: any) => {
      console.log(arg)
      callback('[Client] Got player coords')
    })

    return () => {
      console.log('Clean up Game...')
      socketDisconnect()
      setIsLoadingAuth(false)
    }
  }, [])
  return <p>Game</p>
}

export default Game
