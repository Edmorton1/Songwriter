import * as Tone from 'tone';
import store from "@/store/canvas-store"

const guitarNotes = [
  "E2", "F2", "Fs2", "G2", "Gs2", "A2", "As2", "B2", "C3", "Cs3", "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4",
  "A2", "As2", "B2", "C3", "Cs3", "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4",
  "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5",
  "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", "Ds5", "E5", "F5", "Fs5", "G5",
  "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", "Ds5", "E5", "F5", "Fs5", "G5", "Gs5", "A5", "As5", "B5",
  "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", "Ds5", "E5", "F5", "Fs5", "G5", "Gs5", "A5", "As5", "B5", "C6", "Cs6", "D6", "Ds6", "E6",
];
// const guitarNotes = [
//   "E2", "F2", "Fs2", "G2", "Gs2", "A2", "As2", "B2", "C3", "Cs3", "D3", "Ds3", "E3", 
//   "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", 
//   "A2", "As2", "B2", "C3", "Cs3", "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", 
//   "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", 
//   "A4", "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", 
//   "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", 
//   "Cs5", "D5", "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", 
//   "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", "Ds5", "E5", 
//   "F5", "Fs5", "G5", "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", 
//   "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", "Ds5", "E5", "F5", "Fs5", "G5", 
//   "Gs5", "A5", "As5", "B5", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", 
//   "C5", "Cs5", "D5", "Ds5", "E5", "F5", "Fs5", "G5", "Gs5", "A5", "As5", "B5"
// ];

const sounds = ["A2", "A3", "A4", "A5", "C3", "C4", "C5", "C6", "Cs2", "Ds3", "Ds4", "Ds5", "E2", "Fs2", "Fs3", "Fs4", "Fs5"]

const preloadCache: {note: string, player: Tone.Player}[] = []

export async function preloadSound() {
  console.log(guitarNotes.length)

  function createPlayer(note: string) {
    const url = `/guitar-electric/${note}.wav`
    const player = new Tone.Player({
      url,
      autostart: false,
    })

    preloadCache.push({
      note: note,
      player: player
    })

    return player
  }

  const notes = [...guitarNotes]
  for (const note of notes) {
    if (sounds.includes(note) && !Object.values(preloadCache).flatMap(tone => tone.note).includes(note)) {
      createPlayer(note)
    }
    if (!Object.values(preloadCache).map(tone => tone.note).includes(note)) {
      let pitch = 0
      let noteSound = note
      const notInSound = guitarNotes.indexOf(note)
      const prev = guitarNotes[notInSound - 1]
      const prevprev = guitarNotes[notInSound - 2]
      if (sounds.includes(prev)) {
        pitch++
        noteSound = prev
      } else {
        pitch = pitch + 2
        noteSound = prevprev
      }
      // if (Object.values(preloadCache).map(tone => tone.note).includes(noteSound)) {
      //   const player = preloadCache.find(e => e.note == noteSound).player
      //   player.connect(pitch == 1 ? pitchShiftOne : pitchShiftTwo)
      //   preloadCache.push({
      //     note: note,
      //     player: player
      //   })
      // } else  {
      //   const player = createPlayer(noteSound)
      //   player.connect(pitch == 1 ? pitchShiftOne : pitchShiftTwo)
      //   preloadCache.push({
      //     note: note,
      //     player: player
      //   })
      // }
    }
  }
  const arr = Object.values(preloadCache).flatMap(tone => tone.note)
  console.log(arr)
}

const pitchShiftOne = new Tone.PitchShift(1).toDestination()
const pitchShiftTwo = new Tone.PitchShift(2).toDestination()
export async function startSound(note: string) {
  // const player = preloadCache.find(e => e.note == note).player.toDestination()
  // player.start()

  let pitch = 0
  if (!sounds.includes(note)) {
    const notInSound = guitarNotes.indexOf(note)
    const prev = guitarNotes[notInSound - 1]
    const prevprev = guitarNotes[notInSound - 2]
    // console.log(note, prev, prevprev)
    if (sounds.includes(prev)) {
      pitch++
      note = prev
    } else {
      pitch = pitch + 2
      note = prevprev
    }
  }
  console.log(note, pitch)
  try {
    const player = preloadCache.find(e => e.note == note).player
    player.disconnect()
    
    if (pitch === 1) {
      player.connect(pitchShiftOne)
    } else if (pitch === 2) {
      player.connect(pitchShiftTwo)
    } else {
      player.toDestination()
    }

    player.start()
  } catch(error) {
    console.log(error)
  }
}

export async function playChord() {
  const playnotes = [...store.PLAYNOTES].reverse()
  const notes = playnotes
  // console.log(notes)
  const delay = (ms: number) =>  new Promise((res, rej) => setTimeout(res, ms))
  // startSound('A2')
  // await delay
  // startSound("E2")
  for (let note of notes) {
    startSound(note)
    note != 'X' && await delay(50)
  }
}