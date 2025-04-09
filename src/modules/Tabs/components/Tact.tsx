import * as style from "@/css/tabs-canvas.module.scss"
import store from "@/store/tabs-store"
import { useEffect, useRef, useState } from "react"

function Tact() {
  const canvas = useRef(null)
  const [ctxB, setCtxB] = useState(null)

  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    setCtxB(ctx)

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.current.getBoundingClientRect()

    canvas.current.width = dpr * rect.width
    canvas.current.height = dpr * rect.height
    ctx.scale(dpr, dpr)

    ctx.beginPath()
    for (let i = 0; i < store.STRINGS; i++) {
      const y = i === 0 ? 1 : rect.height / store.STRINGS * i - (i * 5)
      ctx.rect(0, y, store.TACT_WIDTH, 1)
      ctx.stroke()
      ctx.strokeStyle = "#606060"
    }
    
    ctx.beginPath()
    for (let i = 0; i < store.BEAT; i++) {
      const x = i * rect.width / store.BEAT
      const otstup = rect.width / 8
      ctx.rect(x + otstup, rect.height - store.BEAT_HEIGHT, 5, store.BEAT_HEIGHT)
      ctx.strokeStyle = "#D9D9D9"
      ctx.stroke()
      ctx.fillStyle = "#D9D9D9"
      ctx.fill()
    }
  }, [])


  return (
    <canvas ref={canvas} className={style.tact} width={store.TACT_WIDTH_PX} height={store.TACT_HEIGHT_PX}></canvas>
  )
}

export default Tact