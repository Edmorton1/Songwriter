import store from "@/store/canvas-store"

let prevNotes = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']

export function otmetka(ctx: CanvasRenderingContext2D, lad: number, string: number, note: string) {
  const vertic = store.CANVAS_HEIGHT / store.STRINGS
  const horiz = store.CANVAS_WIDTH / store.LADS
  const otstupHoriz = horiz * (lad + 1) - store.CANVAS_WIDTH / store.LADS / 2
  const otstupVert = vertic * (string + 1)
  
  function removeString() {
    prevNotes[string] = store.PLAYNOTES[string]
    const snizu = store.CANVAS_HEIGHT / store.STRINGS * (string + 1) - store.RADIUS
    const remove = store.RADIUS * 2
    ctx.clearRect(0, snizu, store.CANVAS_WIDTH, remove)
    store.setPlayNotes(note, string)
  }

  function drawCircle() {
    if (prevNotes[string] != store.PLAYNOTES[string]) {
      ctx.beginPath()
      ctx.arc(otstupHoriz, otstupVert, store.RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = "white"
      ctx.fill()
    }
    else store.PLAYNOTES[string] = store.STANDART[string]
  }

  function drawCross() {
    if (prevNotes[string] != store.PLAYNOTES[string]) {
      ctx.save();

      ctx.translate(otstupHoriz, otstupVert);
    
      ctx.rotate(Math.PI / 4);
    
      ctx.beginPath();
      ctx.moveTo(-store.RADIUS, 0);
      ctx.lineTo(store.RADIUS, 0);
    
      ctx.moveTo(0, -store.RADIUS);
      ctx.lineTo(0, store.RADIUS);
    
      ctx.strokeStyle = "red";
      ctx.lineWidth = 10;
      ctx.stroke();
    
      ctx.restore();
    }
    else store.PLAYNOTES[string] = store.STANDART[string]
  }

  removeString()
  console.log(prevNotes, store.PLAYNOTES)
  if (lad == 0) {
    return drawCross()
  }
  return drawCircle()
}