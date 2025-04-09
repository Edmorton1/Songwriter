import store from "@/store/canvas-store"
import { Chord } from "tonal"
import * as Tone from "tone"

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