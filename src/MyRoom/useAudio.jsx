import { useEffect, useState, useMemo } from "react"

const SONGS = [
  {
    composer: "Beethoven",
    image: "/images/Beethoven.jpg",
    url: "/audio/Beethoven_3rd.mp3",
  },
  {
    composer: "Mozart",
    image: "/images/Mozart.jpg",
    url: "/audio/TurkishMarch.mp3",
  },
  {
    composer: "Javad Maroufi",
    image: "/images/JavadMaroufi.jpg",
    url: "/audio/GoldenDreams.mp3",
  },
]

let mounted = false

const useAudio = () => {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [songs, setSongs] = useState([])

  useMemo(() => {
    for (let i = 0; i < SONGS.length; i++) {
      const song = new Audio(SONGS[i].url)
      song.volume = 0.5
      setSongs(prev => [...prev, song])
    }
  }, [])

  // Global methods
  const toggle = () => setPlaying(!playing)
  const forward = () =>
    index + 1 < songs.length ? setIndex(index + 1) : setIndex(0)
  const backward = () =>
    index - 1 >= 0 ? setIndex(index - 1) : setIndex(songs.length - 1)
  const setVolume = volume => {
    if (!songs || !songs[index]) return
    songs[index].volume = volume
  }

  // Local methods
  const play = i => songs[i]?.play()
  const pause = i => songs[i]?.pause()

  // Play and pause
  useEffect(() => {
    playing ? play(index) : pause(index)
  }, [playing])

  // Forward and backward logic
  useEffect(() => {
    // Making sure we do stuff once everything is loaded
    if (mounted) {
      // Getting the song to be reset
      for (let i = 0; i < songs.length; i++) {
        pause(i)
        songs[i].currentTime = 0
      }

      // Play the next song if already playing
      playing && play(index)
    }

    return () => {
      mounted = true
    }
  }, [index])

  useEffect(() => {
    songs[index]?.addEventListener("ended", () => forward())
    return () => {
      songs[index]?.removeEventListener("ended", () => setPlaying(false))
    }
  }, [])

  return [
    playing,
    toggle,
    forward,
    backward,
    setVolume,
    SONGS[index].composer,
    SONGS[index].image,
  ]
}

export default useAudio
