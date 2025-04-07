import { makeAutoObservable, runInAction, toJS } from "mobx"

class CanvasStore {
  constructor() {
    makeAutoObservable(this)
  }

  CANVAS_HEIGHT_PX = "400px"
  CANVAS_WIDTH_PX = "1400px"
  
  CANVAS_HEIGHT = Number(this.CANVAS_HEIGHT_PX.slice(0, -2)) + 6
  CANVAS_WIDTH = Number(this.CANVAS_WIDTH_PX.slice(0, -2)) + 6
  
  LADS = 13
  STRINGS = 6 + 1

  RADIUS = 25
  
  PLAYNOTES = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']
  STANDART = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']
  // let PLAYNOTES = ['F4', 'C4', 'A3', 'F3', 'C3', 'F2']
  // PLAYNOTES = ['E4', 'B3', 'Gs3', 'E3', 'B2', 'E2']

  setPlayNotes = (note: string, string: number) => {
    // runInAction(() => this.PLAYNOTES[y] = note)
    this.PLAYNOTES[string] = note
    console.log(toJS(this.PLAYNOTES), string)
  }
}

export default new CanvasStore()