import { useEffect } from 'react'
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
    <Wrapper>
      <Three />
    </Wrapper>
  )
}

export default Game
