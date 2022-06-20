import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import Ground from '../../../../three/world/plane'

const CanvasComponent = () => {
  const { gl } = useThree()
  gl.setSize(window.innerWidth, window.innerHeight)
  gl.setPixelRatio(window.devicePixelRatio)
  gl.shadowMap.enabled = true
  useEffect(() => {
    return () => {
      gl.dispose()
    }
  }, [])
  return (
    <>
      <ambientLight args={['#ffffff']} />
      <pointLight castShadow position={[10, 10, 10]} />
      <Ground />
    </>
  )
}

export default CanvasComponent
