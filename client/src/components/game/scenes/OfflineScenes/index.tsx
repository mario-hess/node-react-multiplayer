import { useState } from 'react'
import { SCENES } from '../SceneLoader'
import { SceneLoader } from '../SceneLoader'

interface ComponentProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const OfflineScenes = ({ setConnected }: ComponentProps) => {
  const [scene, setScene] = useState(SCENES.Splash)

  const Scene = SceneLoader(scene)
  return <Scene setScene={setScene} setConnected={setConnected} />
}

export default OfflineScenes
