import { useState, useEffect } from 'react'
import { SCENES } from '../../SceneLoader'
import LoadingSpinner from '../../../../layout/loading-spinner'

interface ComponentProps {
  setScene: React.Dispatch<React.SetStateAction<SCENES>>
}

const Winkl7 = ({ setScene }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return isLoading ? <LoadingSpinner /> : <p>Winkl7</p>
}

export default Winkl7
