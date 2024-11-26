import Animations from "./Animations"
import Emission from "./Emission"
import Primitives from "./Primitives"

const MyRoom = ({ orbitControls }) => {
  return (
    <group position={[0, -1.5, 0]}>
      <Emission />
      <Primitives />
      <Animations orbitControls={orbitControls} />
    </group>
  )
}

export default MyRoom
