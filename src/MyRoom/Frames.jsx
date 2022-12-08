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

export default function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3(), ...props }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  const state = useThree()

  useEffect(() => {
    const duration = 2
    clicked.current = ref.current.getObjectByName(params?.id)

    // Frame was clicked
    if (clicked.current) {
      // Disabling orbit controls
      props.orbit.current.enabled = false

      // Setting the new position and rotation to go to
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, 0, 1))
      clicked.current.parent.getWorldQuaternion(q)

      // Snapping to the selected frame postion and rotation
      gsap.to(state.camera.position, { ...p, duration: 2, ease: "power2.inOut" })
      gsap.to(state.camera.quaternion, { ...q, duration: 2, ease: "power2.inOut" })
    } else { // Frame was not clicked
      // Making sure we snap back to default, if we were just on a frame
      if (!props.orbit.current.enabled) {
        // Default camera position and rotation
        const position = JSON.parse(localStorage.getItem("camera-position"))
        const quaternion = JSON.parse(localStorage.getItem("camera-quaternion"))

        // Snapping back to original camera position
        gsap.to(state.camera.position, { ...position, duration, ease: "power2.inOut" })
        gsap.to(state.camera.quaternion, { ...quaternion, duration, ease: "power2.inOut" })

        // Enabling orbit controls
        setTimeout(() => {
          props.orbit.current.enabled = true
        }, duration * 1000)
      }
    }
  })

  return (
    <group
      ref={ref}
      onClick={e => { e.stopPropagation(); setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name) }}
      onPointerMissed={() => setLocation('/')}
    >
      {images.map(props => <Frame key={props.url} {...props} />)}
    </group>
  )
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