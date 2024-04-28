import { BaseComponent } from './BaseComponent'

const patternCanvasMap = new Map<string, Promise<HTMLCanvasElement>>()
const RED_IMG = new Promise<HTMLImageElement>((resolve) => {
  const RED_SRC =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAXNSR0IArs4c6QAAABRJREFUGFdj/M/A8J+RgYGRgQAAAE1KAgJsz3fXAAAAAElFTkSuQmCC'

  const img = new Image()
  img.onload = () => {
    resolve(img)
  }
  img.src = RED_SRC
})

/**
 * 创建一个平铺图像的canvas
 * @param targetCanvas
 */
const createPatternCanvas = async (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  const maxEdge = Math.max(width, height)
  const diagonalLength = Math.sqrt(maxEdge * maxEdge * 2) * 2

  // 以最大边对角线为基准，创建一个正方形
  canvas.width = diagonalLength
  canvas.height = diagonalLength

  // 写入平铺
  const patternImg = await RED_IMG
  const ctx = canvas.getContext('2d')!
  const pattern = ctx.createPattern(patternImg, 'repeat')!

  ctx.fillStyle = pattern
  // 将原点移动到 Canvas 中心
  ctx.translate(canvas.width / 2, canvas.height / 2)
  // 旋转 45 度
  ctx.rotate(Math.PI / 4)
  // 将原点移回到左上角
  ctx.translate(-canvas.width, -canvas.height / 2)
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return canvas
}

// const patternCanvas =

/**
 * 绘制一圈边框线
 */
export class MatrixBorderComponent extends BaseComponent {
  order = 99

  public patternCanvas?: HTMLCanvasElement

  /**
   * @param canvas    canvas元素
   * @param lineWidth 线条宽度
   * @param rounded   圆角弧度
   */
  constructor(
    protected canvas: HTMLCanvasElement,
    protected lineWidth: number,
    protected rounded = 0
  ) {
    super(canvas)
    const mapKey = `${canvas.width}_${canvas.height}`
    this.start(mapKey)
  }

  /**
   * 加载异步的资源
   */
  private start(mapKey: string) {
    if (!patternCanvasMap.has(mapKey)) {
      patternCanvasMap.set(
        mapKey,
        createPatternCanvas(this.canvas.width, this.canvas.height)
      )
    }

    patternCanvasMap.get(mapKey)!.then((patternCanvas) => {
      this.patternCanvas = patternCanvas
      this.waitEnd()
    })
  }

  /**
   * 绘制斜纹
   */
  update(context: CanvasRenderingContext2D): void {
    const pattern = context.createPattern(this.patternCanvas!, 'repeat')!
    context.fillStyle = pattern
    context.lineWidth = this.lineWidth
    context.lineCap = 'round'
    context.strokeStyle = pattern
    context.roundRect(
      this.lineWidth / 2,
      this.lineWidth / 2,
      this.canvas.width - this.lineWidth,
      this.canvas.height - this.lineWidth,
      this.rounded
    )
    context.stroke()
  }

  /**
   * 绘制虚线
   * @param context
   */
  afterUpdate(context: CanvasRenderingContext2D): void {
    const { width, height } = this.canvas
    context.strokeStyle = 'red'
    context.lineWidth = 1
    context.drawDashedRect(1, 1, width - 2, height - 2, 5, this.rounded)
    context.drawDashedRect(
      this.lineWidth,
      this.lineWidth,
      width - this.lineWidth * 2,
      height - this.lineWidth * 2,
      5,
      this.rounded
    )
  }
}
