import { Html } from "@react-three/drei"
// import { useControls } from "leva";
import getUuidByString from "uuid-by-string"
import { useLocation } from "wouter"

const Laptop = ({ nodes, texture }) => {
  // const position = useControls("position", {
  //   x: { value: -0.070, min: -0.500, max: 0.500, step: 0.001 },
  //   y: { value: 0.375, min: -0.500, max: 0.500, step: 0.001 },
  //   z: { value: 0.365, min: -0.500, max: 0.500, step: 0.001 },
  // })
  // const rotation = useControls("rotation", {
  //   x: { value: -1.58, min: -Math.PI, max: Math.PI, step: 0.001 },
  //   y: { value: 0.89, min: -Math.PI, max: Math.PI, step: 0.001 },
  //   z: { value: 1.575, min: -Math.PI, max: Math.PI, step: 0.001 },
  // })
  // const distance = useControls("distance", {
  //   factor: 0.146
  // })

  const [location, setLocation] = useLocation()
  const name = getUuidByString("Laptop")

  // If ipad is clicked, then zoom in on it
  const handleClick = e => {
    e.stopPropagation()
    setLocation(`/item/${name}`)
  }

  return (
    <mesh
      geometry={nodes.LaptopScreen.geometry}
      position={nodes.LaptopScreen.position}
    >
      <meshBasicMaterial map={texture} />
      <Html
        transform
        // occlude
        position={[-0.07, 0.375, 0.365]}
        rotation={[-1.58, 0.89, 1.575]}
        distanceFactor={0.146}
      >
        <div className="w-full h-full cursor-default" onClick={handleClick}>
          {/* Pointer cursor when not zoomed in, and default when zoomed in */}
          <div
            className={
              (location === "/" ? "cursor-pointer z-10" : "-z-10") +
              " absolute top-0 left-0 w-full h-full"
            }
          ></div>

          <div>
            <iframe
              src="https://www.mohsenameli.com/"
              className="w-[1400px] h-[810px]"
              title="portfolio"
            />
          </div>
        </div>
      </Html>
    </mesh>
  )
}

export default Laptop
