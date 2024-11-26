import { Perf } from "r3f-perf"
import { useRef } from "react"
import Controls from "./Controls"
import MyRoom from "./MyRoom/MyRoom"
import { Sparkles } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const Experience = () => {
  const orbitRef = useRef()

  const setCamera = camera => {
    localStorage.setItem("camera-position", JSON.stringify(camera.position))
    localStorage.setItem("camera-quaternion", JSON.stringify(camera.quaternion))
  }

  return (
    <Canvas
      camera={{
        fov: 45,
        far: 100,
        near: 0.1,
        position: [4, 1.5, 4],
      }}
      onCreated={({ camera }) => setCamera(camera)}
    >
      {/* <Perf position='bottom-right' /> */}
      <Controls ref={orbitRef} />
      <color args={["black"]} attach="background" />
      <Sparkles size={10} scale={[20, 20, 20]} speed={0.4} count={100} />
      <MyRoom orbitControls={orbitRef} />
    </Canvas>
  )
}

export default Experience
