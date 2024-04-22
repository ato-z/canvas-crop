import { RED_IMG } from '../const'
/**
 * 围绕canvas绘制一圈切线
 */
export class CutLine implements CANVAS_COMPONENT {
  order = 9
  includes = []
  private _patternCanvas?: HTMLCanvasElement

  constructor(
    protected canvasConsole: CANVAS_CONSOLE,
    protected lineWidth: number,
    protected round = 10
  ) {}

  get patternCanvas() {
    if (!this._patternCanvas) {
      this._patternCanvas = this.createPatternCanvas()
    }

    return this._patternCanvas!
  }

  /**
   * 返回一张斜纹图像
   */
  private createPatternCanvas() {
    const { width, height } = this.canvasConsole.canvas
    const canvas = document.createElement('canvas')
    const maxEdge = Math.max(width, height)
    const diagonalLength = Math.sqrt(maxEdge * maxEdge * 2) * 2

    canvas.width = diagonalLength
    canvas.height = diagonalLength

    const ctx = canvas.getContext('2d')!
    const pattern = ctx.createPattern(RED_IMG, 'repeat')!

    ctx.fillStyle = pattern
    ctx.translate(canvas.width / 2, canvas.height / 2) // 将原点移动到 Canvas 中心
    ctx.rotate(Math.PI / 4) // 旋转 45 度
    ctx.translate(-canvas.width, -canvas.height / 2) // 将原点移回到左上角
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    return canvas
  }

  /**
   * 绘制虚线边框
   */
  handleAfter(canvasConsole: CANVAS_CONSOLE) {
    const { context, canvas } = canvasConsole

    context.strokeStyle = 'red'
    context.lineWidth = 1
    context.drawDashedRect(
      1,
      1,
      canvas.width,
      canvas.height,
      5 * canvasConsole.rpx,
      this.round
    )
    context.drawDashedRect(
      this.lineWidth,
      this.lineWidth,
      canvas.width - this.lineWidth * 2,
      canvas.height - this.lineWidth * 2,
      5 * canvasConsole.rpx,
      this.round
    )
  }

  /**
   * 绘制斜纹
   */
  handle(canvasConsole: CANVAS_CONSOLE) {
    const { context, canvas } = canvasConsole
    const pattern = context.createPattern(this.patternCanvas, 'repeat')!
    context.fillStyle = pattern
    context.lineWidth = this.lineWidth
    context.lineCap = 'round'
    context.strokeStyle = pattern
    context.roundRect(
      this.lineWidth / 2,
      this.lineWidth / 2,
      canvas.width - this.lineWidth,
      canvas.height - this.lineWidth,
      this.round
    )
    context.stroke()
  }
}
