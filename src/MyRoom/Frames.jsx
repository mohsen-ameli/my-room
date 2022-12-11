/**
 * Code bits and pieces taken partially from https://codesandbox.io/u/drcmda
 * Appreciate your work drcmda :)
 */


import { Image, useCursor } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'
import gsap from "gsap"

const pexel = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`

export default function Frames({ q = new THREE.Quaternion(), p = new THREE.Vector3(), orbitControls, nodes, material }) {
  const images = [
    { position: nodes.Frame000.position, scale: [0.33, 0.45, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(327482) },
    { position: nodes.Frame001.position, scale: [0.26, 0.36, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(325185) },
    { position: nodes.Frame002.position, scale: [0.33, 0.44, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(358574) },
    { position: nodes.Frame003.position, scale: [0.39, 0.31, 0.01], rotation: [0, Math.PI / 2, 0], url: pexel(358579) },
    // { position: [nodes.Ipad.position.x + 0.02, nodes.Ipad.position.y, nodes.Ipad.position.z], scale: [0.39, 0.31, 0.01], rotation: [-1.58, 1.08, 1.58], url: pexel(358580) },
  ]

  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  const state = useThree()

  // Animating the tween of the frames
  useEffect(() => {
    const duration = 2
    // console.log(ref.current.getObjectByName(params?.id).parent)
    clicked.current = ref.current.getObjectByName(params?.id)

    // Frame was clicked
    if (clicked.current) {
      // Disabling orbit controls
      orbitControls.current.enabled = false

      // Setting the new position and rotation to go to
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, 0, 1))
      clicked.current.parent.getWorldQuaternion(q)

      // Snapping to the selected frame postion and rotation
      gsap.to(state.camera.position, { ...p, duration: 2, ease: "power2.inOut" })
      gsap.to(state.camera.quaternion, { ...q, duration: 2, ease: "power2.inOut" })
    } else { // Frame was not clicked
      // Making sure we snap back to default, if we were just on a frame
      if (!orbitControls.current.enabled) {
        // Default camera position and rotation
        const position = JSON.parse(localStorage.getItem("camera-position"))
        const quaternion = JSON.parse(localStorage.getItem("camera-quaternion"))

        // Snapping back to original camera position
        gsap.to(state.camera.position, { ...position, duration, ease: "power2.inOut" })
        gsap.to(state.camera.quaternion, { ...quaternion, duration, ease: "power2.inOut" })

        // Enabling orbit controls
        setTimeout(() => {
          orbitControls.current.enabled = true
          orbitControls.current.reset()
        }, duration * 1000)
      }
    }
  })

  const clickHandler = (e) => {
    e.stopPropagation()
    setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name)
  }

  return <>
    {/* Images */}
    <group
      ref={ref}
      onClick={clickHandler}
      onPointerMissed={() => setLocation('/')}
    >
      {images.map(props => <Frame key={props.url} {...props} />)}
    </group>

    <OutsideFrame nodes={nodes} material={material} />
  </>
}

function Frame({ url, ...props }) {
  const image = useRef()
  const [hovered, hover] = useState(false)
  const name = getUuid(url)

  // Pointer cursor
  useCursor(hovered)

  return (
    <group rotation={props.rotation} position={props.position}>
      <mesh
        name={name}
        onPointerOver={e => { e.stopPropagation(); hover(true) }}
        onPointerOut={() => hover(false)}
        position-z={0.001}
        scale={props.scale}
      >
        <planeGeometry />
        <Image raycast={() => null} ref={image} position={[0, 0, 0.1]} url={url} />
      </mesh>
    </group>
  )
}

function OutsideFrame({ nodes, material }) {
  return <group>
    {/* Frames */}
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
}