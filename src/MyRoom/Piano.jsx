import gsap from "gsap"
import { useEffect, useRef } from "react"

const Piano = ({ nodes, material, playPiano }) => {
  const whiteKeys = useRef()
  const blackKeys = useRef()

  // Piano animation
  useEffect(() => {
    let interval = playPiano && setInterval(() => {
      // Random white key
      const index1 = Math.round(Math.random() * (whiteKeys.current.children.length - 1))
      const key1 = whiteKeys.current.children[index1].position

      // Random black key
      const index2 = Math.round(Math.random() * (blackKeys.current.children.length - 1))
      const key2 = blackKeys.current.children[index2].position

      // Pressing animation
      gsap.fromTo(key1, { y: 0 }, { y: -0.015, yoyo: true, duration: 0.1, repeat: 1, ease: "power3" })
      gsap.fromTo(key2, { y: 0 }, { y: -0.015, yoyo: true, duration: 0.1, repeat: 1, ease: "power3" })
    }, 150)

    return () => {
      playPiano && clearInterval(interval)
    }
  }, [playPiano])

  return <group>
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