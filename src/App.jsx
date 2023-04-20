import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"

const App = () => {
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
      <Experience />
    </Canvas>
  )
}

export default App
