import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Box = (props: any) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref: any = useRef()

  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame(() => {
    ref.current.position.x = props.currentPosition.x
    ref.current.position.y = props.currentPosition.y
    ref.current.position.z = props.currentPosition.z

    ref.current.rotation.x = props.currentRotation.x
    ref.current.rotation.y = props.currentRotation.y
    ref.current.rotation.z = props.currentRotation.z
    ref.current.rotation.w = props.currentRotation.w
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default Box
