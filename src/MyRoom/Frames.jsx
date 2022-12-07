import { Image, useCursor } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

export default function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3(), ...props }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  const smoothness = 0.4

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, 0, 0.5))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })

  // Camera animation when a frame is clicked on
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, p, smoothness, delta)
    easing.dampQ(state.camera.quaternion, q, smoothness, delta)
  })

  return (
    <group
      ref={ref}
      onClick={e => { e.stopPropagation(); setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name); props.setEnabled(false) }}
      onPointerMissed={() => { setLocation('/'); props.setEnabled(true) }}
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