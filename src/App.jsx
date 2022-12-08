import { Canvas } from '@react-three/fiber'
import { useState } from 'react';
import Experience from './Experience';

const App = () => {
  const [camera, setCamera] = useState(null)

  return <Canvas
    camera={{
      fov: 45,
      far: 100,
      near: 0.1,
      position: [3, 1, 3]
      // position: [0, 2, 15]
    }}
    onCreated={({ camera }) => setCamera(camera)}
  >
    <Experience camera={camera} />
  </Canvas>
}

export default App;