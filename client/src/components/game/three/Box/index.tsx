import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Box = (props: any) => {
  const ref: any = useRef()

  useFrame(() => {
    ref.current.position.copy(props.data.position)

    ref.current.quaternion.copy(props.data.rotation)
  })

  return (
    <mesh {...props} castShadow ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default Box
