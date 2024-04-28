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
 * 绘制一圈边框线
 */
export class MatrixBorder {
  order = 99

  /**
   *
   * @param canvas    canvas元素
   * @param lineWidth 线条宽度
   * @param rounded   圆角弧度
   */
  constructor(
    protected canvas: HTMLCanvasElement,
    protected lineWidth: number,
    protected rounded = 0
  ) {}

  /**
   * 创建一个离屏canvas用于绘制平铺图像
   */
  private async createPatternCanvas() {
    const { width, height } = this.canvas
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
}
