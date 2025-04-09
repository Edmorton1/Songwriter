interface beatsInterface {
  string: number,
  fret: number
}

interface tactsInterface {
  "bpm": 120,
  "beat": [number, number],
  "beats": [beatsInterface[] | null]
}

export interface songInterface {
  "name": "Unchained",
  "author": "Arseny St",
  "user": "Lycoris Justise",
  "tacts": tactsInterface[]
}