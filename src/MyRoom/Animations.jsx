import { useGLTF, useTexture } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from "three"
import Chair from "./Chair"
import Frames from "./Frames"
import Laptop from "./Laptop"
import Piano from "./Piano"

const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })

const Animations = ({ orbitControls }) => {
  const { nodes } = useGLTF("./Anim/AnimModel.glb")
  const animTexture = useTexture("./Anim/AnimBaked.png")
  animTexture.flipY = false

  // Fixing the encoding and updating the material
  useEffect(() => {
    animTexture.encoding = THREE.sRGBEncoding
    animTexture.needsUpdate = true

    material.map = animTexture
    material.needsUpdate = true
  }, [])

  return <group>
    {/* Animation frames */}
    <Frames nodes={nodes} material={material} orbitControls={orbitControls} />

    {/* Picture frames */}
    <group>
      <mesh
        geometry={nodes.Frame000.geometry}
        material={material}
        position={nodes.Frame000.position}
      />
      <mesh
        geometry={nodes.Frame001.geometry}
        material={material}
        position={nodes.Frame001.position}
      />
      <mesh
        geometry={nodes.Frame002.geometry}
        material={material}
        position={nodes.Frame002.position}
      />
      <mesh
        geometry={nodes.Frame003.geometry}
        material={material}
        position={nodes.Frame003.position}
      />
    </group>

    {/* Chair */}
    <Chair nodes={nodes} material={material} />

    {/* Piano */}
    <Piano nodes={nodes} material={material} />

    {/* Laptop Screen */}
    <Laptop nodes={nodes} material={material} />

    {/* Flower Pots */}
    <group>
      <mesh
        geometry={nodes.Pot000.geometry}
        material={material}
        position={nodes.Pot000.position}
      >
        {/* <boxGeometry /> */}
        {/* <MeshWobbleMaterial color="red" factor={1} /> */}
      </mesh>
      <mesh
        geometry={nodes.Pot001.geometry}
        material={material}
        position={nodes.Pot001.position}
      />
      <mesh
        geometry={nodes.Pot002.geometry}
        material={material}
        position={nodes.Pot002.position}
      />
      <mesh
        geometry={nodes.Pot003.geometry}
        material={material}
        position={nodes.Pot003.position}
      />
    </group>
  </group>
}

export default Animations