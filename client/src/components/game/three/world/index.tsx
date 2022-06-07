import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

import Box from '../Box'

interface ComponentProps {
  players: []
}

const World = ({ players }: ComponentProps) => {
  const { gl } = useThree()

  gl.setSize(window.innerWidth, window.innerHeight)
  gl.setPixelRatio(window.devicePixelRatio)
  gl.shadowMap.enabled = true

  useEffect(() => {
    console.log('Rendering World...')
    return () => {
      console.log('Cleaning up World...')
    }
  }, [])

  return (
    <>
      <ambientLight args={['#ffffff']} />
      <pointLight position={[10, 10, 10]} />
      {players.map((player: any, index) => {
        return (
          <Box
            key={index}
            currentPosition={{
              position: player.position,
            }}
            currentQuaternion={{
              quaternion: player.quaternion,
            }}
          />
        )
      })}
    </>
  )
}

export default World
