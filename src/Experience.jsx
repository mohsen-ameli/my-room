import { OrbitControls, Sparkles } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { MyRoom } from './MyRoom/MyRoom'

const Experience = ({ camera }) => {
  const orbit = useRef()

  return <>
    {/* Controls */}
    <OrbitControls
      makeDefault
      position={[0, 2, 0]}
      rotateSpeed={0.5}
      ref={orbit}
    />

    {/* Performances */}
    {/* <Perf position='top-left' /> */}

    {/* Background color */}
    <color args={["black"]} attach="background" />

    {/* Some sparkles */}
    <Sparkles
      size={15}
      scale={[20, 20, 20]}
      speed={0.4}
      count={300}
    />

    {/* My room model */}
    <MyRoom orbit={orbit} camera={camera} />
  </>
}

export default Experience