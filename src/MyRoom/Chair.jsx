import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Chair = ({ nodes, material }) => {
  const chair = useRef()

  // Chair animation
  useFrame(state => {
    const time = state.clock.elapsedTime

    // Spinning chair
    chair.current.rotation.y = Math.sin(time / 4) - 0.5
  })

  return <mesh
    geometry={nodes.ChairTop.geometry}
    material={material}
    position={nodes.ChairTop.position}
    rotation={nodes.ChairTop.rotation}
    ref={chair}
  />
}

export default Chair