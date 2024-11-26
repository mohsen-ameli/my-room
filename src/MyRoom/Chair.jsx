import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Chair = ({ nodes, texture }) => {
  const chair = useRef()

  useFrame(state => {
    const time = state.clock.elapsedTime
    chair.current.rotation.y = Math.sin(time / 4) - 0.5
  })

  return (
    <mesh
      geometry={nodes.ChairTop.geometry}
      position={nodes.ChairTop.position}
      rotation={nodes.ChairTop.rotation}
      ref={chair}
    >
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export default Chair
