import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import Experience from './Experience'

const App = () => {
  const [camera, setCamera] = useState(null)

  return <Canvas
    camera={{
      fov: 45,
      far: 100,
      near: 0.1,
      position: [4, 1.5, 4]
    }}
    onCreated={({ camera }) => setCamera(camera)}
  >
    <Experience camera={camera} />
  </Canvas>
}

export default App