import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

import Box from '../Box'

interface ComponentProps {
  players: []
}

const World = ({ players }: ComponentProps) => {
  useEffect(() => {
    console.log('Rendering World...')
    return () => {
      console.log('Cleaning up World...')
    }
  }, [])

  const { gl } = useThree()
  gl.setSize(window.innerWidth, window.innerHeight)
  gl.setPixelRatio(window.devicePixelRatio)
  gl.shadowMap.enabled = true
  return (
    <>
      <ambientLight args={['#ffffff']} />
      <pointLight position={[10, 10, 10]} />
      {players.map((player: any, index) => {
        return (
          <Box
            key={index}
            position={[player.position.x, player.position.y, player.position.z]}
            rotation={[player.rotation.x, player.rotation.y, player.rotation.z]}
          />
        )
      })}
    </>
  )
}

export default World
