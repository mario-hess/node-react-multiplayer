import { useRef } from 'react'
import { useFrame, Euler, Quaternion } from '@react-three/fiber'

const Box = (props: any) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref: any = useRef()

  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame(() => {
    ref.current.position.copy(props.currentPosition.position)

    ref.current.quaternion.copy(props.currentQuaternion.quaternion)
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default Box
