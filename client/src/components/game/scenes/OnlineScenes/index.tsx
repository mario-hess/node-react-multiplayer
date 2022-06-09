import { useState, useEffect } from 'react'
import { SCENES } from '../SceneLoader'
import { SceneLoader } from '../SceneLoader'
import {
  socketConnect,
  socketDisconnect,
} from '../../../../socket/socket-handle'

interface ComponentProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const OnlineScenes = ({ setConnected }: ComponentProps) => {
  const [scene, setScene] = useState(SCENES.Lobby)

  useEffect(() => {
    console.log('Connecting Socket...')
    socketConnect()

    return () => {
      console.log('Disconnecting Socket...')
      socketDisconnect()
    }
  }, [])

  const Scene = SceneLoader(scene)
  return <Scene setScene={setScene} setConnected={setConnected} />
}

export default OnlineScenes
