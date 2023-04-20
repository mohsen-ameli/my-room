import { OrbitControls } from "@react-three/drei"
import { forwardRef } from "react"

const Controls = forwardRef((props, ref) => {
  return (
    <OrbitControls
      makeDefault
      position={[0, 2, 0]}
      rotateSpeed={0.5}
      minAzimuthAngle={0}
      maxAzimuthAngle={Math.PI / 1.7}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      enableDamping
      dampingFactor={0.02}
      zoomSpeed={2}
      ref={ref}
      {...props}
    />
  )
})

export default Controls
