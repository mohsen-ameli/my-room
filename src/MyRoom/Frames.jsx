import { Image, useCursor } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { Quaternion, Vector3 } from "three"

export default function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3(), ...props }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  const smoothness = 0.4

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)

    // Frame was clicked
    if (clicked.current) {
      // Disabling controls
      props.orbit.current.enabled = false

      // Setting the new position to go to
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, 0, 1))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      // Enabling controls
      props.orbit.current.reset()
      props.orbit.current.enabled = true
    }
  })

  // Camera animation when a frame is clicked on
  useFrame((state, delta) => {
    if (clicked.current) {
      easing.damp3(state.camera.position, p, smoothness, delta)
      easing.dampQ(state.camera.quaternion, q, smoothness, delta)
    } else {
      // easing.damp3(p, state.camera.position, smoothness, delta)
      // easing.dampQ(q, state.camera.quaternion, smoothness, delta)
      // easing.damp3(p, new Vector3(3, 1, 3), smoothness, delta)
      // easing.dampQ(state.camera.quaternion, new Quaternion(-0.10669003326258625, 0.380123185292065, 0.044192458747399854, 0.9176985493045644), smoothness, delta)
    }
  })

  return (
    <group
      ref={ref}
      onClick={e => { e.stopPropagation(); setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name) }}
      onPointerMissed={() => { setLocation('/') }}
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