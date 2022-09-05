interface Opt {
  x: number
  y: number
}
interface Padding {
  left: number
  right: number
  bottom: number
  top: number
}

interface RectOpt extends Opt {
  width: number
  height: number
  rounded?: number
  background?: string
}
interface TextOpt {
  x?: number
  y?: number
  text: string
  padding?: Padding
  color: string
  font: string
}

export class Text {
  ctx: CanvasRenderingContext2D
  options: Required<TextOpt>
  width: number
  height: number
  constructor(context: CanvasRenderingContext2D, options: TextOpt) {
    this.ctx = context
    const newOpt = Object.assign({}, options)
    newOpt.padding = newOpt.padding || { left: 0, right: 0, top: 0, bottom: 0 }
    newOpt.x = newOpt.x || 0
    newOpt.y = newOpt.y || 0
    this.options = newOpt as Required<TextOpt>
    const [width, height] = this.getShape()
    this.width = width
    this.height = height
  }
  getShape() {
    const {
      ctx,
      options: { font, text, padding },
    } = this
    ctx.save()
    ctx.font = font
    const textMetrics = ctx.measureText(text)
    let width = textMetrics.width + padding.left + padding.right
    let height =
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent +
      padding.top +
      padding.bottom
    ctx.restore()
    return [width, height]
  }
  setPosition(x: number, y: number) {
    this.options.x = x
    this.options.y = y
  }
  getPosition() {
    const {
      options: { x, y },
    } = this
    return { x, y }
  }
  render() {
    const {
      ctx,
      options: { x, y, text, color, font, padding },
    } = this
    ctx.save()
    ctx.font = font
    ctx.fillStyle = color
    ctx.textBaseline = 'top'
    ctx.fillText(text, x + padding.left, y + padding.top)
    ctx.restore()
  }
}

export class Rect {
  ctx: CanvasRenderingContext2D
  options: RectOpt
  constructor(context: CanvasRenderingContext2D, options: RectOpt) {
    this.ctx = context
    this.options = options
  }

  render() {
    const { x, y, width, height, background, rounded } = this.options
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = background || '#000000'
    if (!rounded) {
      ctx.fillRect(x, y, width, height)
      ctx.restore()
      return
    }
    ctx.beginPath()
    ctx.moveTo(x + rounded, y)
    ctx.lineTo(x + width - rounded, y)
    ctx.arcTo(x + width, y, x + width, y + rounded, rounded)
    ctx.lineTo(x + width, y + height - rounded)
    ctx.arcTo(x + width, y + height, x + width - rounded, y + height, rounded)
    ctx.lineTo(x + rounded, y + height)
    ctx.arcTo(x, y + height, x, y + height - rounded, rounded)
    ctx.lineTo(x, y + rounded)
    ctx.arcTo(x, y, x + rounded, y, rounded)

    ctx.fill()
    ctx.restore()
  }
}

export const DownloadFunc = {
  action: () => {},
  download() {
    this.action()
  }
}
