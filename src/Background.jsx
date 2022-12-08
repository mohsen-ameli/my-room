import { Sparkles } from "@react-three/drei";

const Background = () => {
  return <>
    <color args={["black"]} attach="background" />

    {/* Some sparkles */}
    <Sparkles
      size={10}
      scale={[20, 20, 20]}
      speed={0.4}
      count={100}
    />
  </>
}

export default Background;