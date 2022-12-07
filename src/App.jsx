import { Canvas } from '@react-three/fiber'
import Experience from './Experience';

const App = () => {
  return <Canvas
    camera={{
      fov: 45,
      far: 100,
      near: 0.1,
      position: [3, 1, 3]
      // position: [0, 2, 15]
    }}
  >
    <Experience />
  </Canvas>
}

export default App;