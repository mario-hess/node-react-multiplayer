import { useRef } from 'react'
const Ground = (props: any) => {
  const ref = useRef()
  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow
      position={[0, -3, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <boxGeometry args={[25, 25, 0.1]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  )
}

export default Ground
