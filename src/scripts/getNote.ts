import { Chord } from "tonal"

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

export function findChord(notes: string[]) {
  const notesValidate = notes.map(e => e.replace(/\d/, '').replace('s', '#')).filter(e => e != "X")
  console.log(notesValidate)
  const chord = Chord.detect(notesValidate)
  return chord
}