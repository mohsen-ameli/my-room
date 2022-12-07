import { useGLTF, useTexture, MeshWobbleMaterial } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import Frames from "./Frames"

const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`

const Animations = props => {
  const { nodes } = useGLTF("./Anim/AnimModel.glb")
  const animTexture = useTexture("./Anim/AnimBaked.png")
  animTexture.flipY = false

  const chair = useRef()
  const whiteKeys = useRef()
  const [beethoven] = useState(() => new Audio("./songs/song.mp3"))

  let index = 0

  const images = [
    { position: nodes.Frame000.position, scale: [0.3, 0.4, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(327482) },
    { position: nodes.Frame001.position, scale: [0.23, 0.31, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(325185) },
    { position: nodes.Frame002.position, scale: [0.28, 0.375, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(358574) },
    { position: nodes.Frame003.position, scale: [0.34, 0.26, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(358579) },
  ]

  // Fixing the encoding and updating the material
  useEffect(() => {
    animTexture.encoding = THREE.sRGBEncoding
    animTexture.needsUpdate = true

    material.map = animTexture
    material.needsUpdate = true

    // Piano animation
    const intervalId = setInterval(() => {
      index = Math.round(Math.random() * whiteKeys.current.children.length)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // Animations
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Spinning chair
    chair.current.rotation.y = Math.sin(time / 4)

    // Piano pressing
    whiteKeys.current.children[index].position.y = -Math.abs(Math.sin(time * 5) / 100)
  })

  // Playing music on demand
  // const playMusic = () => {
  //   beethoven.currentTime = 0
  //   beethoven.paused ? beethoven.play() : beethoven.pause()
  // }
  // The demand
  // window.addEventListener("click", playMusic)

  return <>
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

    {/* Frames */}
    <group>
      <Frames images={images} {...props} />
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

    {/* Flower Pots */}
    <group>
      <mesh
        geometry={nodes.Pot000.geometry}
        material={material}
        position={nodes.Pot000.position}
        scale={nodes.Pot000.scale}
      />
      <mesh
        geometry={nodes.Pot001.geometry}
        material={material}
        position={nodes.Pot001.position}
        scale={nodes.Pot001.scale}
      />
      <mesh
        geometry={nodes.Pot002.geometry}
        material={material}
        position={nodes.Pot002.position}
        scale={nodes.Pot002.scale}
      />
      <mesh
        geometry={nodes.Pot003.geometry}
        material={material}
        position={nodes.Pot003.position}
        scale={nodes.Pot003.scale}
      />
    </group>

    {/* Chair */}
    <mesh
      geometry={nodes.ChairTop.geometry}
      material={material}
      position={nodes.ChairTop.position}
      rotation={nodes.ChairTop.rotation}
      ref={chair}
    />

    {/* White Keys */}
    <group position={nodes.White_Keys000.position} ref={whiteKeys}>
      {Object.values(nodes)?.map((item, index) => {
        if (item.name.includes("White_Keys")) {
          return (
            <mesh
              key={index}
              geometry={item.geometry}
              material={material}
            />
          )
        }
      })}
    </group>

    {/* Black Keys */}
    <group position={nodes.Black_Keys000.position}>
      {Object.values(nodes)?.map((item, index) => {
        if (item.name.includes("Black_Key")) {
          return (
            <mesh
              key={index}
              geometry={item.geometry}
              material={material}
            />
          )
        }
      })}
    </group>
  </>
}

export default Animations