import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

import Ground from './plane'
import Box from '../Box'

interface ComponentProps {
  players: []
}

const World = ({ players }: ComponentProps) => {
  const { gl, camera, scene } = useThree()

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
      <pointLight castShadow position={[10, 10, 10]} />
      <Ground />
      {players.map((player: any, index) => {
        return (
          <Box
            key={index}
            data={{
              position: player.position,
              rotation: player.quaternion,
            }}
          />
        )
      })}
    </>
  )
}

export default World
