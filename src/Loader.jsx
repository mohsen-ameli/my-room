import { useProgress } from "@react-three/drei"
import { ClimbingBoxLoader } from "react-spinners"

const Loader = () => {
  const { progress } = useProgress()

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <ClimbingBoxLoader
        size={30}
        color="#FFA500"
        cssOverride={{ marginLeft: "1.5rem" }}
        speedMultiplier={1.5}
      />
      <h1 className="font-serif pt-2">Loading your experience!</h1>
      <div
        className="h-[3px] my-2 rounded-full bg-white"
        style={{ width: `${progress}%` }}
      ></div>
      <h1 className="text-[15pt] text-center">{progress.toFixed(0)} %</h1>
    </div>
  )
}

export default Loader
