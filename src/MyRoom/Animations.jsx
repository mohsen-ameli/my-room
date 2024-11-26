import { useGLTF, useTexture } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from "three"
import Chair from "./Chair"
import Frames from "./Frames"
import Laptop from "./Laptop"
import Piano from "./Piano"

const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })

const Animations = ({ orbitControls }) => {
  const { nodes } = useGLTF("/models/AnimModel.glb")
  const texture = useTexture("/images/AnimBaked.jpg")
  texture.flipY = false

  return (
    <group>
      <Frames nodes={nodes} orbitControls={orbitControls} />
      <Chair nodes={nodes} texture={texture} />
      <Piano nodes={nodes} texture={texture} />
      <Laptop nodes={nodes} texture={texture} />

      {/* Picture frames */}
      <group>
        <mesh
          geometry={nodes.Frame000.geometry}
          position={nodes.Frame000.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.Frame001.geometry}
          position={nodes.Frame001.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.Frame002.geometry}
          position={nodes.Frame002.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.Frame003.geometry}
          position={nodes.Frame003.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>

      {/* Flower Pots */}
      <group>
        <mesh
          geometry={nodes.Pot000.geometry}
          position={nodes.Pot000.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.Pot001.geometry}
          position={nodes.Pot001.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.Pot002.geometry}
          position={nodes.Pot002.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.Pot003.geometry}
          position={nodes.Pot003.position}
        >
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
    </group>
  )
}

export default Animations
