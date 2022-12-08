import { useGLTF, useTexture } from "@react-three/drei"
import { DoubleSide } from "three"

const Primitives = () => {
  const bigModel = useGLTF("./Big/BigModel.glb")
  const smallModel = useGLTF("./Small/SmallModel.glb")

  const bigTexture = useTexture("./Big/BigBaked.png")
  const smallTexture = useTexture("./Small/SmallBaked.png")
  bigTexture.flipY = false
  smallTexture.flipY = false

  return <>
    {/* Big Elements */}
    <mesh
      geometry={bigModel.nodes.BigBaked.geometry}
      material={bigModel.nodes.BigBaked.material}
      position={bigModel.nodes.BigBaked.position}
    >
      <meshBasicMaterial map={bigTexture} side={DoubleSide} />
    </mesh>

    {/* Small Elements */}
    <mesh
      geometry={smallModel.nodes.SmallBaked.geometry}
      material={smallModel.nodes.SmallBaked.material}
      position={smallModel.nodes.SmallBaked.position}
    >
      <meshBasicMaterial map={smallTexture} side={DoubleSide} />
    </mesh>
  </>
}

export default Primitives