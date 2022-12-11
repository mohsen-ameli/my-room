import useAudio from "./useAudio"

const IpadScreen = ({ setPianoplaying }) => {
  const [playing, toggle, forward, backward, composer, image] = useAudio()

  setPianoplaying(playing)

  return <div className="rounded-[6%] bg-sky-900 flex flex-col justify-center items-center select-none w-[500px] h-[350px] overflow-hidden">
    {/* Name */}
    <h2 className="font-bold font-serif">{composer}</h2>

    {/* Logo */}
    <img className="max-w-[150px] rounded-lg my-2" src={image} alt=":(" />

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