import React from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'

import { SCENES } from '../../../SceneLoader'
import CanvasComponent from '../CanvasComponent'

interface ComponentProps {
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

const Component = ({ setScene }: ComponentProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setScene(SCENES.CharacterMenu)
  }

  return (
    <>
      <ComponentWrapper>
        <p>Splash</p> <button onClick={handleClick}>Enter</button>
      </ComponentWrapper>
      <WebGLCanvas>
        <CanvasComponent />
      </WebGLCanvas>
    </>
  )
}

export default Component
