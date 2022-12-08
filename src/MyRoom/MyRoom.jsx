import Animations from "./Animations"
import Emission from "./Emission"
import Primitives from "./Primitives"

const MyRoom = props => {
  return <group position={[0, -1.5, 0]}>
    {/* Emissions */}
    <Emission />

    {/* Primitives */}
    <Primitives />

    {/* Animations */}
    <Animations {...props} />
  </group>
}

export default MyRoom