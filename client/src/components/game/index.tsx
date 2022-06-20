import { useState } from 'react'

import OnlineScenes from './scenes/OnlineScenes'
import OfflineScenes from './scenes/OfflineScenes'

const Game = () => {
  const [connected, setConnected] = useState(false)

  return connected ? (
    <OnlineScenes setConnected={setConnected} />
  ) : (
    <OfflineScenes setConnected={setConnected} />
  )
}

export default Game

/*import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'

import { socketConnect, socketDisconnect } from '../../socket/socket-handle'
import Three from './three'

interface ComponentProps {
  isLoadingAuth: boolean
  setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>
}
const Wrapper = styled(Canvas)`
  width: 100%;
  min-height: 100vh;
`
const Game = ({ isLoadingAuth, setIsLoadingAuth }: ComponentProps) => {
  useEffect(() => {
    console.log('Rendering Game')
    socketConnect()

    return () => {
      console.log('Clean up Game...')
      socketDisconnect()
      if (isLoadingAuth) setIsLoadingAuth(false)
    }
  }, [])
  return (
    <Wrapper shadows>
      <Three />
    </Wrapper>
  )
}

export default Game
*/
