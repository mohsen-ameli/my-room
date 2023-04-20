import { useGLTF } from "@react-three/drei"

const Emission = () => {
  const emissionModel = useGLTF("./EmissionModel.glb")

  return (
    <>
      {/* Bed Light */}
      <mesh
        geometry={emissionModel.nodes.Bed_Lamp.geometry}
        position={emissionModel.nodes.Bed_Lamp.position}
      >
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Table Light */}
      <mesh
        geometry={emissionModel.nodes.Light_Bulb.geometry}
        position={emissionModel.nodes.Light_Bulb.position}
      >
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Wall Light */}
      <mesh
        geometry={emissionModel.nodes.Wall_Lamp.geometry}
        position={emissionModel.nodes.Wall_Lamp.position}
      >
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Desk Light */}
      <mesh
        geometry={emissionModel.nodes.Desk_Light002.geometry}
        position={emissionModel.nodes.Desk_Light002.position}
      >
        <meshBasicMaterial color="white" />
      </mesh>
    </>
  )
}

export default Emission
