import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import Background from './Background'
import Controls from './Controls'
import MyRoom from './MyRoom/MyRoom'

const Experience = () => {
  const orbitRef = useRef()

  return <>
    {/* Controls */}
    <Controls ref={orbitRef} />

    {/* Performances */}
    {/* <Perf position='top-left' /> */}

    {/* Background */}
    <Background />

    {/* My room model */}
    <MyRoom orbitControls={orbitRef} />
  </>
}

export default Experience