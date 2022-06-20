import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import { SCENES } from '../../../SceneLoader'

import CanvasComponent from '../CanvasComponent'

interface ComponentProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
  setScene: React.Dispatch<React.SetStateAction<SCENES>>
}

const WebGLCanvas = styled(Canvas)`
  width: 100vw;
  height: 100vh;
`

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
`

const Component = ({ setConnected, setScene }: ComponentProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setConnected(true)
  }

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <>
      <ComponentWrapper>
        <p>CharacterMenu</p> <button onClick={handleClick}>Enter World</button>
      </ComponentWrapper>
      <WebGLCanvas>
        <CanvasComponent />
      </WebGLCanvas>
    </>
  )
}

export default Component
