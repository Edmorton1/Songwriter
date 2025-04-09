import * as styles from "@/css/canvas.module.scss"
import { Suspense, useEffect, useRef, useState } from "react"
import { playChord, preloadSound, startSound } from "@/scripts/sound"
import store from "@/store/canvas-store"
import { otmetka } from "@/modules/Canvas/canvas-drawing"
import { findLad, findString } from "@/modules/Canvas/canvas-logic"
import { findChord, getNote } from "@/scripts/getNote"

function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const canvasBack = useRef<HTMLCanvasElement>(null)
  const canvasNumbers = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null)
  const [chord, setChord] = useState(null)

  useEffect(() => {
    const ctxB = canvasBack.current.getContext('2d')
    setCtx(canvas.current.getContext('2d'))

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.current.getBoundingClientRect()
    canvasBack.current.width = dpr * rect.width
    canvasBack.current.height = dpr * rect.height
    ctxB.scale(dpr, dpr)

    ctxB.beginPath()
    const otstup = rect.width / store.LADS
    ctxB.rect(otstup, 0, -20, store.CANVAS_HEIGHT)
    ctxB.fillStyle = "#F0EAD6"
    ctxB.fill()
    ctxB.stroke()
    ctxB.strokeStyle = "#F0EAD6"

    ctxB.beginPath()
    for (let i = 2; i < store.LADS; i++) {
      const otstup = i * rect.width / store.LADS
      ctxB.rect(otstup, 0, 5, store.CANVAS_HEIGHT)
      ctxB.fillStyle = "#C0C0C0"
      ctxB.fill()
      ctxB.stroke()
      ctxB.strokeStyle = "#C0C0C0"
    }

    ctxB.beginPath()
    for (let i = 1; i < store.STRINGS; i++) {
      const otstup = i * rect.height / store.STRINGS
      ctxB.rect(0, otstup, store.CANVAS_WIDTH, 1)
      ctxB.stroke()
      ctxB.strokeStyle = "#B0B0B0"
    }
  }, [])

  useEffect(() => {
    const ctx = canvasNumbers.current.getContext('2d')
  
    const dpr = window.devicePixelRatio || 1
    const rect = canvasNumbers.current.getBoundingClientRect()
  
    canvasNumbers.current.width = rect.width * dpr
    canvasNumbers.current.height = rect.height * dpr
    ctx.scale(dpr, dpr)
  
    ctx.beginPath()
    ctx.font = "30px Impact"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    for (let i = 1; i < store.LADS + 1; i++) {
      const otstup = (i - 0.5) * rect.width / store.LADS
      // const otstup = (i + 0.05) * rect.width / store.LADS
      ctx.fillText((i - 1).toString(), otstup, 0)
    }
  }, [])

  function handlerCanvas(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const rect = canvas.current.getBoundingClientRect()
    const x = (event.clientX - rect.left)
    const y = (event.clientY - rect.top)

    const lad = findLad(x)
    const string = findString(y)
    let note = getNote(lad, string)

    // console.log(note, x, y)
    otmetka(ctx, lad, string, note)
    startSound(note)
  }

  return (
    <>
      <canvas onClick={(event) => handlerCanvas(event)} ref={canvas} className={styles.canvas} width={store.CANVAS_WIDTH_PX} height={store.CANVAS_HEIGHT_PX}></canvas>
      <canvas ref={canvasBack} className={styles.canvasBackground} width={store.CANVAS_WIDTH_PX} height={store.CANVAS_HEIGHT_PX}></canvas>
      <canvas ref={canvasNumbers} className={styles.canvasNumbers} style={{height: "50px", width: store.CANVAS_WIDTH_PX}}></canvas>
      <div>Настройки управления</div>
      <button onClick={() => playChord()} >Воспроизвести аккорд</button>
      <button onClick={() => ctx.clearRect(0, 0, store.CANVAS_WIDTH, store.CANVAS_HEIGHT)}>Очистить</button>
      <button onClick={() => setChord(findChord(store.PLAYNOTES))}>Определить аккорд</button>
      <span>Аккорд: {chord}</span>
    </>
  )
}

export default Canvas