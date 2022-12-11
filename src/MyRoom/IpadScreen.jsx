import { useEffect, useState } from "react"
import { useRef } from "react"
import useAudio from "./useAudio"

const DEFAULT_VOLUME = 0.5

const IpadScreen = ({ setPianoplaying }) => {
  const [volume, setVol] = useState(DEFAULT_VOLUME)

  const [playing, toggle, forward, backward, setVolume, composer, image] = useAudio()

  setVolume(volume?.target?.value ? volume.target.value : volume)

  setPianoplaying(playing)

  return <div className="rounded-[6%] bg-sky-800 flex flex-col justify-center items-center select-none w-[500px] h-[350px] overflow-hidden">
    {/* Name */}
    <h2 className="font-bold font-serif">{composer}</h2>

    {/* Logo */}
    <img className="max-w-[125px] rounded-lg my-2" src={image} alt=":(" />

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
        onChange={(e) => setVol(e)}
      />
      <i className="fa-solid fa-volume-high text-gray-400"></i>
    </div>

    {/* Controls */}
    <div className="w-full flex gap-x-6 justify-center">
      <i className="fa-solid fa-backward text-lg text-gray-400 hover:text-white cursor-pointer p-1 hover:scale-125 ease duration-100" onClick={backward}></i>
      {playing ?
        <i className="fa-solid fa-pause text-lg text-gray-400 hover:text-white cursor-pointer max-w-[30px] p-1 hover:scale-125 ease duration-100" onClick={toggle}></i>
        :
        <i className="fa-solid fa-play text-lg text-gray-400 hover:text-white cursor-pointer max-w-[30px] p-1 hover:scale-125 ease duration-100" onClick={toggle}></i>
      }
      <i className="fa-solid fa-forward text-lg text-gray-400 hover:text-white cursor-pointer p-1 hover:scale-125 ease duration-100" onClick={forward}></i>
    </div>
  </div>
}

export default IpadScreen