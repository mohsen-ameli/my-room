import { Perf } from "r3f-perf"
import { useRef } from "react"
import Background from "./Background"
import Controls from "./Controls"
import MyRoom from "./MyRoom/MyRoom"

const Experience = () => {
  const orbitRef = useRef()

  return (
    <>
      {/* <Perf position='top-left' /> */}

      <Controls ref={orbitRef} />

      <Background />

      <MyRoom orbitControls={orbitRef} />
    </>
  )
}

export default Experience
