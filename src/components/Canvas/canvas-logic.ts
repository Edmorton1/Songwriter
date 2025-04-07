import store from "@/store/canvas-store"

export function findString(y: number) {
  const sector = store.CANVAS_HEIGHT / 7
  const sectorAndPolovina = sector + store.CANVAS_HEIGHT / 14
  for (let i = 0; i < 6; i++) {
    if (y <= (sectorAndPolovina + sector * i)) {
      return i
    }
  }
  return 5
}

export function findLad(x: number) {
  const sector = store.CANVAS_WIDTH / store.LADS
  for (let i = 1; i < store.LADS + 1; i++) {
    if (x <= i * sector) {
      return i - 1
    }
  }
}

export function getNote(lad: number, string:number) {
  const openStrings = [
    { note: "E", octave: 4 },
    { note: "B", octave: 3 },
    { note: "G", octave: 3 },
    { note: "D", octave: 3 },
    { note: "A", octave: 2 },
    { note: "E", octave: 2 },
  ]
  const chromatic = ["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"]

  // console.log(lad, string)
  const openNote = openStrings[string]
  const openNoteIndex = chromatic.indexOf(openNote.note)
  const noteIndex = (openNoteIndex + lad) % 12
  const note = lad == 0 ? 'X' : chromatic[noteIndex]
  const octav = lad == 0 ? '' : openNote.octave + Math.floor((openNoteIndex + lad) / 12)
  return `${note}${octav}`
}