import { Html } from "@react-three/drei"
import { useState } from "react"
import getUuidByString from "uuid-by-string"
import { useLocation } from "wouter"
import useAudio from "./useAudio"

// Ipad structure
const Ipad = props => {
  const [location, setLocation] = useLocation()
  const name = getUuidByString("Ipad")

  // If ipad is clicked, then zoom in on it
  const handleClick = e => {
    e.stopPropagation()
    setLocation(`/item/${name}`)
  }

  return (
    <Html
      transform
      position={[0.0055, 0.004, 0]}
      rotation={[-1.58, 1.08, 1.58]}
      distanceFactor={0.261}
    >
      <div className="w-full h-full cursor-default" onClick={handleClick}>
        <div
          className={
            (location === "/" ? "cursor-pointer z-10" : "-z-10") +
            " absolute -top-1 -left-2 w-[105%] h-[105%]"
          }
        ></div>

        <IpadScreen {...props} />
      </div>
    </Html>
  )
}

// Ipad screen
const DEFAULT_VOLUME = 0.5

const IpadScreen = props => {
  const [volume, setVol] = useState(DEFAULT_VOLUME)
  const [playing, toggle, forward, backward, setVolume, composer, image] = useAudio()

  // Setting the volume, according to the "state volume"
  setVolume(volume?.target?.value ? volume.target.value : volume)

  // Setting the piano pressing animation
  props.setPianoPlaying(playing)

  // The screen
  return (
    <div className="rounded-[6%] bg-sky-800 flex flex-col justify-center items-center select-none w-[500px] h-[350px] overflow-hidden">
      {/* Name */}
      <h2 className="font-bold font-serif">{composer}</h2>

      {/* Logo */}
      <img className="h-[125px] rounded-lg my-2" src={image} alt="Album Art" /> 

      {/* Volume */}
      <div className="flex items-center gap-x-3 w-3/4">
        <i className="fa-solid fa-volume-low text-gray-400"></i>

        <input
          type="range"
          className="w-full h-2 cursor-pointer focus:outline-none focus:ring-0 focus:shadow-none"
          min="0"
          max="1"
          step="0.001"
          defaultValue={DEFAULT_VOLUME}
          onChange={e => setVol(e)}
        />

        <i className="fa-solid fa-volume-high text-gray-400"></i>
      </div>

      {/* Controls */}
      <div className="w-full flex gap-x-6 justify-center">
        {/* Backward */}
        <i
          className="fa-solid fa-backward text-lg text-gray-400 hover:text-white cursor-pointer p-1 hover:scale-125 ease duration-100"
          onClick={backward}
        ></i>

        {/* Play/pause */}
        {playing ? (
          <i
            className="fa-solid fa-pause text-lg text-gray-400 hover:text-white cursor-pointer max-w-[30px] p-1 hover:scale-125 ease duration-100"
            onClick={toggle}
          ></i>
        ) : (
          <i
            className="fa-solid fa-play text-lg text-gray-400 hover:text-white cursor-pointer max-w-[30px] p-1 hover:scale-125 ease duration-100"
            onClick={toggle}
          ></i>
        )}

        {/* Forward */}
        <i
          className="fa-solid fa-forward text-lg text-gray-400 hover:text-white cursor-pointer p-1 hover:scale-125 ease duration-100"
          onClick={forward}
        ></i>
      </div>
    </div>
  )
}

export default Ipad
