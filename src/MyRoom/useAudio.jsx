import { useEffect, useState } from "react"

const songs_info = [
  { composer: "Beethoven", image: "/songs/Beethoven.jpg", url: "/songs/Beethoven_3rd.mp3" },
  { composer: "Mozart", image: "/songs/Mozart.jpg", url: "/songs/TurkishMarch.mp3" },
  { composer: "Javad Maroufi", image: "/songs/JavadMaroufi.jpg", url: "/songs/GoldenDreams.mp3" },
]

const songs = []

for (let i = 0; i < songs_info.length; i++) {
  songs[i] = new Audio(songs_info[i].url)
  songs[i].volume = 0.5
}

let mounted = false

const useAudio = () => {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  // Global methods
  const toggle = () => setPlaying(!playing)
  const forward = () => (index + 1 < songs.length) ? setIndex(index + 1) : setIndex(0)
  const backward = () => (index - 1 >= 0) ? setIndex(index - 1) : setIndex(songs.length - 1)
  const setVolume = (volume) => songs[index].volume = volume

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
      // Getting the song to be resetted
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
    songs[index]?.addEventListener('ended', () => forward())
    return () => {
      songs[index]?.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return [playing, toggle, forward, backward, setVolume, songs_info[index].composer, songs_info[index].image]
}

export default useAudio