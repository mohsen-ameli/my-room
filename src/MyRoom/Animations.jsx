import { MeshWobbleMaterial, useGLTF, useTexture } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from "three"
import Chair from "./Chair"
import Frames from "./Frames"
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

  return <>
    {/* Frames */}
    <Frames nodes={nodes} material={material} orbitControls={orbitControls} />

    {/* Chair */}
    <Chair nodes={nodes} material={material} />

    {/* Piano */}
    <Piano nodes={nodes} material={material} />

    {/* Piano Tray */}
    <mesh
      geometry={nodes.Piano_Tray.geometry}
      material={material}
      position={nodes.Piano_Tray.position}
    />

    {/* Laptop Screen */}
    <mesh
      geometry={nodes.LaptopScreen.geometry}
      material={material}
      position={nodes.LaptopScreen.position}
    />

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
  </>
}

export default Animations