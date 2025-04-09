import { getNote } from "@/scripts/getNote";
import { startSound } from "@/scripts/sound";
import { songInterface } from "@/scripts/types";

export async function startSong() {
  const delay = async (ms: number) => new Promise((res, rej) => setTimeout(res, ms))
  //@ts-ignore
  const song: songInterface = await import("@/modules/Tabs/model.json")
  // startSound(getNote(10, 1))
  // setTimeout(() => startSound(getNote(9, 1)), 500)
  // setTimeout(() => startSound(getNote(9, 2)), 1000)
  // setTimeout(() => startSound(getNote(9, 3)), 1500)

  for (let tact of song.tacts) {
    const ms = tact.bpm / 60 / tact.beat[1] * 1000
    console.log(ms)
    for (let beat of tact.beats) {
      console.log(beat)
      try {
        for (let note of beat) {
          await delay(ms / beat.length)
          startSound(getNote(note.fret, note.string))
        }
      } catch {
        await delay(ms)
      }
    }
  }
  await delay(1000)
  console.log('asdasdasdasd')
}3