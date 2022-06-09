import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'

import CanvasComponent from '../CanvasComponent'

interface ComponentProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const Component = ({ setConnected }: ComponentProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setConnected(true)
  }

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <>
      <p>CharacterMenu</p> <button onClick={handleClick}>Enter World</button>
      <Canvas>
        <CanvasComponent />
      </Canvas>
    </>
  )
}

export default Component
