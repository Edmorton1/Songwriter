import * as styles from "@/css/canvas.module.scss"
import { Suspense, useEffect, useRef, useState } from "react"
import { playChord, preloadSound, startSound } from "@/components/Canvas/sound"
import store from "@/store/canvas-store"
import { otmetka } from "@/components/Canvas/canvas-drawing"
import { findLad, findString, getNote } from "@/components/Canvas/canvas-logic"

function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const canvasBack = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null)

  useEffect(() => {
    preloadSound()
    const ctxB = canvasBack.current.getContext('2d')
    setCtx(canvas.current.getContext('2d'))
    const dpr = window.devicePixelRatio || 1

    ctxB.scale(dpr, dpr)
    const rect = canvas.current.getBoundingClientRect()

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
      <div className={styles.canvasNumbers} style={{top: store.CANVAS_HEIGHT_PX, width: store.CANVAS_WIDTH_PX}}>asdasdasddsaasdasdadsasd</div>
      <div>Настройки управления</div>
      <button onClick={() => playChord()} >Воспроизвести аккорд</button>
      <button onClick={() => ctx.clearRect(0, 0, store.CANVAS_WIDTH, store.CANVAS_HEIGHT)}>Очистить</button>
    </>
  )
}

export default Canvas