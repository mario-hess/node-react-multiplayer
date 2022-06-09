import { useState, useEffect, useRef } from 'react'
import { socket } from '../../../socket/socket-handle'
import World from './world'

const Three = () => {
  const [players, setPlayers]: any = useState([])

  useEffect(() => {
    console.log('Rendering Three...')

    socket?.on('clients', (arg: any) => {
      setPlayers(arg)
    })

    return () => {
      console.log('Cleaning up Three...')
    }
  }, [])

  return <World players={players} />
}

export default Three
