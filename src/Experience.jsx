import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import Background from './Background'
import Controls from './Controls'
import MyRoom from './MyRoom/MyRoom'

const Experience = () => {
  const ref = useRef()

  return <>
    {/* Controls */}
    <Controls ref={ref} />

    {/* Performances */}
    {/* <Perf position='top-left' /> */}

    {/* Background */}
    <Background />

    {/* My room model */}
    <MyRoom orbit={ref} />
  </>
}

export default Experience