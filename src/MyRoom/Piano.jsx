import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import Ipad from "./Ipad"

const Piano = ({ nodes, material }) => {
  const whiteKeys = useRef()
  const blackKeys = useRef()

  // Playing piano or not
  const [pianoPlaying, setPianoplaying] = useState(false)

  // Piano animation
  useEffect(() => {
    let interval = pianoPlaying && setInterval(() => {
      // Random white key index
      const index1 = Math.round(Math.random() * (whiteKeys.current.children.length - 1))
      const key1 = whiteKeys.current.children[index1].position

      // Random black key index
      const index2 = Math.round(Math.random() * (blackKeys.current.children.length - 1))
      const key2 = blackKeys.current.children[index2].position

      // Piano key pressing animation
      gsap.fromTo(key1, { y: 0 }, { y: -0.015, yoyo: true, duration: 0.1, repeat: 1, ease: "power3" })
      gsap.fromTo(key2, { y: 0 }, { y: -0.015, yoyo: true, duration: 0.1, repeat: 1, ease: "power3" })
    }, 150)

    return () => {
      pianoPlaying && clearInterval(interval)
    }
  }, [pianoPlaying])

  return <group>
    {/* Ipad */}
    <mesh
      geometry={nodes.Ipad.geometry}
      material={material}
      position={nodes.Ipad.position}
    >
      <Ipad setPianoplaying={setPianoplaying} />
    </mesh>

    {/* White Keys */}
    <group position={nodes.White_Keys000.position} ref={whiteKeys}>
      {Object.values(nodes)?.map((item, index) => {
        if (item.name.includes("White_Keys")) {
          return (
            <mesh
              key={index}
              geometry={item.geometry}
              material={material}
            />
          )
        }; return null
      })}
    </group>

    {/* Black Keys */}
    <group position={nodes.Black_Keys000.position} ref={blackKeys}>
      {Object.values(nodes)?.map((item, index) => {
        if (item.name.includes("Black_Key")) {
          return (
            <mesh
              key={index}
              geometry={item.geometry}
              material={material}
            />
          )
        }; return null
      })}
    </group>
  </group>
}

export default Piano;