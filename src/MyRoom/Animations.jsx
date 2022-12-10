import { Html, MeshWobbleMaterial, useGLTF, useTexture } from "@react-three/drei"
import { useControls } from "leva"
import { useEffect, useState } from "react"
import * as THREE from "three"
import Chair from "./Chair"
import Frames from "./Frames"
import IpadScreen from "./IpadScreen"
import Piano from "./Piano"
import useAudio from "./useAudio"

const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })

const Animations = ({ orbitControls }) => {
  const rotation = useControls({
    x: { value: -1.58, min: -Math.PI, max: Math.PI, step: 0.01 },
    y: { value: 1.08, min: -Math.PI, max: Math.PI, step: 0.01 },
    z: { value: 1.58, min: -Math.PI, max: Math.PI, step: 0.01 },
  })

  const { nodes } = useGLTF("./Anim/AnimModel.glb")
  const animTexture = useTexture("./Anim/AnimBaked.png")
  animTexture.flipY = false

  // Piano
  const [playing, toggle, forward, backward, composer, image] = useAudio("./songs/Beethoven_3rd.mp3")

  // Fixing the encoding and updating the material
  useEffect(() => {
    animTexture.encoding = THREE.sRGBEncoding
    animTexture.needsUpdate = true

    material.map = animTexture
    material.needsUpdate = true
  }, [])

  return <>
    {/* Frames */}
    {/* <Frames nodes={nodes} material={material} orbitControls={orbitControls} /> */}

    {/* Chair */}
    <Chair nodes={nodes} material={material} />

    {/* Piano */}
    <Piano nodes={nodes} material={material} playPiano={playing} />

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
    {/* Ipad */}
    <mesh
      geometry={nodes.Ipad.geometry}
      material={material}
      position={nodes.Ipad.position}
    >
      <Html
        transform
        occlude
        position={[0.0055, 0.004, 0]}
        // rotation={[-1.58, 1.09, 1.58]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={0.026}
      >
        <IpadScreen composer={composer} image={image} playing={playing} toggle={toggle} forward={forward} backward={backward} />
      </Html>
    </mesh>

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