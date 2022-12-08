import { Environment, OrbitControls, PresentationControls, Sparkles, Stage, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { Suspense, useState } from 'react'
import { MyRoom } from './MyRoom/MyRoom'

const Experience = ({ camera }) => {
  const orbit = useRef()

  return <>
    <OrbitControls
      makeDefault
      position={[0, 2, 0]}
      rotateSpeed={0.5}
      ref={orbit}
    />

    {/* <Perf position='top-left' /> */}

    {/* <Stage preset="rembrandt" intensity={10.5} environment="city"> */}{/* </Stage> */}

    {/* <PresentationControls
      // enabled={true} // the controls can be disabled by setting this to false
      global // Spin globally or by dragging the model
      cursor={false} // Whether to toggle cursor style on drag
      snap={true} // Snap-back to center (can also be a spring config)
      // speed={1} // Speed factor
      zoom={0.8} // Zoom factor when half the polar-max is reached
      rotation={[0.5, -0.8, 0]} // Default rotation
      polar={[0, 0]} // Vertical limits
      azimuth={[-Math.PI / 4, Math.PI / 4]} // Horizontal limits
      // config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
      enabled={enabled}
    > */}
    <MyRoom orbit={orbit} camera={camera} />
    {/* </PresentationControls> */}

    {/* <Environment preset="night" blur={0} background /> */}
    <color args={["black"]} attach="background" />

    {/* <Sparkles
      size={15}
      scale={[20, 20, 20]}
      speed={0.4}
      count={300}
    /> */}
  </>
}

export default Experience;