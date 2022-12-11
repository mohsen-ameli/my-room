import { Html, Image, MeshWobbleMaterial, useGLTF, useTexture } from "@react-three/drei"
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

  return <group>
    {/* Frames */}
    <Frames nodes={nodes} material={material} orbitControls={orbitControls} />

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
        // occlude
        position={[0.0055, 0.004, 0]}
        rotation={[-1.58, 1.08, 1.58]}
        distanceFactor={0.261}
      >
        <div className="w-full h-full cursor-default" onClick={e => e.stopPropagation()}>
          <IpadScreen composer={composer} image={image} playing={playing} toggle={toggle} forward={forward} backward={backward} />
        </div>
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
  </group>
}

export default Animations