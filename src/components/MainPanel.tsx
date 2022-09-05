import { FC, useContext, useEffect, useRef } from "react";
import { Rect, Text } from "../utils";
import { Store, StoreContext } from "../App";
import { DownloadFunc } from "../utils";

const render = (dom: HTMLCanvasElement, data: Store) => {
  const ctx = dom.getContext('2d')
  if (!ctx) return
  const width = dom.width
  const height = dom.height
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, width, height)
  const { text, fontSize } = data
  const padding = {
    left: 4,
    right: 4,
    top: 8,
    bottom: 4
  }

  const textDrawable = text.map((t, i) => {
    return new Text(ctx, {
      text: t,
      color: i === 0 ? '#ffffff' : '#000000',
      font: `bold ${fontSize}px sans-serif`,
      padding
    })
  })

  {
    const [t0, t1] = textDrawable
    const totalWidth = t0.width + t1.width
    t0.setPosition(width / 2 - totalWidth / 2, height / 2 - t0.height / 2)
    const { x, y } = t0.getPosition()
    t1.setPosition(x + t0.width, y)
  }

  const rectDrawable = textDrawable.map((t, i) => {
    const { x, y } = t.getPosition()
    return new Rect(ctx, {
      x,
      y,
      width: t.width,
      height: t.height,
      background: i === 0 ? '#000000' : 'rgb(255, 152, 0)',
      rounded: 3
    })
  })

  rectDrawable.forEach(r => r.render())
  textDrawable.forEach(t => t.render())

}

const MainPanel: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const store = useContext(StoreContext)
  const { state } = store as { state: Store }
  useEffect(() => {
    if (!canvasRef.current) return
    const { current: dom } = canvasRef
    render(dom, state)
    DownloadFunc.action = () => {
      console.log('click')
      const link = document.createElement('a')
      link.setAttribute('download', 'any-hub')
      link.href = dom.toDataURL('image/png')
      link.click()
    }

  }, [canvasRef, state])

  return (
    <div className="flex justify-center flex-grow">
      <canvas ref={canvasRef} width={state.size[0]} height={state.size[1]} className="m-auto"></canvas>
    </div>
  )
}

export default MainPanel