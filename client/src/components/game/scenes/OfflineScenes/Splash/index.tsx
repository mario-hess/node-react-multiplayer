import React, { useState, useEffect } from 'react'
import { SCENES } from '../../SceneLoader'
import LoadingSpinner from '../../../../layout/loading-spinner'
import Component from './Component'

interface ComponentProps {
  setScene: React.Dispatch<React.SetStateAction<SCENES>>
}

const Splash = ({ setScene }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return isLoading ? <LoadingSpinner /> : <Component setScene={setScene} />
}

export default Splash
