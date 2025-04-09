import Tab from "@/modules/Tabs/components/Tab"
import { startSong } from "@/scripts/song"

function Tabs() {
  return (
    <>
      <button onClick={() => startSong()}>Включить песню</button>
      <Tab />
    </>
  )
}

export default Tabs