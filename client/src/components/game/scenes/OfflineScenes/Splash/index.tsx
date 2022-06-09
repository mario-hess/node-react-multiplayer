import React, { useState, useEffect } from 'react'
import { SCENES } from '../../SceneLoader'
import LoadingSpinner from '../../../../layout/loading-spinner'

interface ComponentProps {
  setScene: React.Dispatch<React.SetStateAction<SCENES>>
}

const Splash = ({ setScene }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const Component = () => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setScene(SCENES.CharacterMenu)
    }

    return (
      <>
        <p>Splash</p> <button onClick={handleClick}>Enter</button>
      </>
    )
  }

  return isLoading ? <LoadingSpinner /> : <Component />
}

export default Splash
