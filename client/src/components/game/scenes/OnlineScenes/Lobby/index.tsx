import { useState, useEffect } from 'react'
import { SCENES } from '../../SceneLoader'
import Three from '../../../three'
import LoadingSpinner from '../../../../layout/loading-spinner'
import { Canvas } from '@react-three/fiber'

import styled from 'styled-components'

interface ComponentProps {
  setScene: React.Dispatch<React.SetStateAction<SCENES>>
}

const Wrapper = styled(Canvas)`
  width: 100%;
  min-height: 100vh;
`

const Lobby = ({ setScene }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Wrapper shadows>
      <Three />
    </Wrapper>
  )
}

export default Lobby
