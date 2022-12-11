import { Html } from "@react-three/drei"
import { useLocation } from "wouter"
import getUuid from 'uuid-by-string'
import IpadScreen from "./IpadScreen"

const Ipad = props => {
  const [, setLocation] = useLocation()
  const name = getUuid("Ipad")

  const handleClick = e => {
    e.stopPropagation()
    setLocation(`/item/${name}`)
  }

  return <Html
    transform
    position={[0.0055, 0.004, 0]}
    rotation={[-1.58, 1.08, 1.58]}
    distanceFactor={0.261}
  >
    <div className="w-full h-full cursor-default" onClick={handleClick}>
      <IpadScreen {...props} />
    </div>
  </Html>
}

export default Ipad