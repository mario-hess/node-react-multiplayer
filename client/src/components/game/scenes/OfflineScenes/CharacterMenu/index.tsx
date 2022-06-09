import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { SCENES } from '../../SceneLoader'
import LoadingSpinner from '../../../../layout/loading-spinner'

import Component from './Component'

interface ComponentProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
  setScene: React.Dispatch<React.SetStateAction<SCENES>>
}

const CharacterMenu = ({ setScene, setConnected }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Component setConnected={setConnected} />
  )
}
export default CharacterMenu
