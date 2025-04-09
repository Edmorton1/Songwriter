import { makeAutoObservable } from "mobx";

class TabsStore {
  constructor() {
    makeAutoObservable(this);
  }

  TACT_HEIGHT_PX = "170px"
  TACT_WIDTH_PX = "700px"
  
  TACT_HEIGHT = Number(this.TACT_HEIGHT_PX.slice(0, -2)) + 6
  TACT_WIDTH = Number(this.TACT_WIDTH_PX.slice(0, -2)) + 6

  STRINGS = 6
  BEAT_HEIGHT = 25
  BEAT = 4
}

export default new TabsStore()