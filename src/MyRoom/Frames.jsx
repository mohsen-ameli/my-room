/**
 * Code bits and pieces taken partially from https://codesandbox.io/u/drcmda
 * Appreciate your work drcmda :)
 */

import { Image, useCursor } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useRoute, useLocation } from "wouter"
import getUuid from "uuid-by-string"
import gsap from "gsap"

const pexel = id =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`

export default function Frames({
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
  orbitControls,
  nodes,
}) {
  const ipadPos = [
    nodes.Ipad.position.x + 0.02,
    nodes.Ipad.position.y,
    nodes.Ipad.position.z,
  ]
  const laptopPos = [
    nodes.LaptopScreen.position.x - 0.25,
    nodes.LaptopScreen.position.y + 0.25,
    nodes.LaptopScreen.position.z + 0.365,
  ]

  // prettier-ignore
  const images = [
    { position: nodes.Frame000.position, scale: [0.33, 0.45, 0.01], rotation: [0, Math.PI / 2, 0], frameName: "FrameLeft", item: (<Image raycast={() => null} position={[0, 0, 0.1]} url={pexel(325185)} />) },
    { position: nodes.Frame001.position, scale: [0.26, 0.36, 0.01], rotation: [0, Math.PI / 2, 0], frameName: "FrameRight", item: (<Image raycast={() => null} position={[0, 0, 0.1]} url={pexel(325191)} />) },
    { position: nodes.Frame002.position, scale: [0.33, 0.44, 0.01], rotation: [0, Math.PI / 2, 0], frameName: "FrameTop", item: (<Image raycast={() => null} position={[0, 0, 0.1]} url={pexel(325181)} />) },
    { position: nodes.Frame003.position, scale: [0.39, 0.31, 0.01], rotation: [0, Math.PI / 2, 0], frameName: "FrameBottom", item: (<Image raycast={() => null} position={[0, 0, 0.1]} url={pexel(325155)} />) },
    { position: ipadPos, scale: [0.75, 0.5, 1], rotation: [-1.58, 1.08, 1.58], frameName: "Ipad", item: <></> },
    { position: laptopPos, scale: [1, 1, 1], rotation: [-1.58, 0.89, 1.575], frameName: "Laptop", item: <></> },
  ]

  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute("/item/:id")
  const [, setLocation] = useLocation()
  const state = useThree()

  // Animating the tween of the frames
  useEffect(() => {
    const duration = 2
    clicked.current = ref.current.getObjectByName(params?.id)

    // Frame was clicked
    if (clicked.current) {
      // Disabling orbit controls
      orbitControls.current.enabled = false

      // Setting the new position and rotation to go to
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, 0, 0.8))
      clicked.current.parent.getWorldQuaternion(q)

      // Snapping to the selected frame postion and rotation
      gsap.to(state.camera.position, { ...p, duration, ease: "power2.inOut" })
      gsap.to(state.camera.quaternion, { ...q, duration, ease: "power2.inOut" })
    } else {
      // Frame was not clicked
      // Making sure we snap back to default, if we were just on a frame
      if (!orbitControls.current.enabled) {
        // Getting default camera position and rotation
        const position = JSON.parse(localStorage.getItem("camera-position"))
        const quaternion = JSON.parse(localStorage.getItem("camera-quaternion"))

        // Snapping back to original camera position
        gsap.to(state.camera.position, {
          ...position,
          duration,
          ease: "power2.inOut",
        })
        gsap.to(state.camera.quaternion, {
          ...quaternion,
          duration,
          ease: "power2.inOut",
        })

        // Enabling orbit controls
        setTimeout(() => {
          orbitControls.current.enabled = true
          orbitControls.current.reset()
        }, duration * 1000)
      }
    }
  })

  const clickHandler = e => {
    e.stopPropagation()
    setLocation(clicked.current === e.object ? "/" : "/item/" + e.object.name)
  }

  return (
    <>
      {/* Frames */}
      <group
        ref={ref}
        onClick={clickHandler}
        onPointerMissed={() => setLocation("/")}
      >
        {images.map((props, index) => (
          <Frame key={index} {...props} />
        ))}
      </group>
    </>
  )
}

function Frame({ ...props }) {
  const [hovered, hover] = useState(false)
  const name = getUuid(props.frameName)

  // Pointer cursor
  useCursor(hovered)

  return (
    <group rotation={props.rotation} position={props.position}>
      <mesh
        name={name}
        onPointerOver={e => {
          e.stopPropagation()
          hover(true)
        }}
        onPointerOut={() => hover(false)}
        position-z={0.001}
        scale={props.scale}
      >
        <planeGeometry />
        <meshBasicMaterial opacity={0} transparent />

        {/* The frame */}
        {props.item}
      </mesh>
    </group>
  )
}
