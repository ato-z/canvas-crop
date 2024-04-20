export class CanvasConsole implements CANVAS_CONSOLE {
  readonly canvas = document.createElement('canvas')
  readonly context
  readonly components: Array<CANVAS_COMPONENT> = []
  dpr = devicePixelRatio
  rpx: number
  constructor(
    public width: number,
    public height: number
  ) {
    this.canvas.width = width * devicePixelRatio
    this.canvas.height = height * devicePixelRatio
    this.rpx = (width * devicePixelRatio) / 375
    this.context = this.canvas.getContext('2d')!

    this.draw()
  }

  /**
   * 重绘画布
   */
  private draw() {
    const { context } = this
    context.clear()

    this.components.forEach((c) => {
      context.beginPath()
      context.save()
      c.handleBefore && c.handleBefore(this)
      c.handle(this)
      c.handleAfter && c.handleAfter(this)
      context.restore()
    })

    requestAnimationFrame(() => this.draw())
  }

  /**
   * 添加组件
   * @param c
   */
  push(c: CANVAS_COMPONENT) {
    this.components.push(c)
    this.components.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  /**
   * 添加到父级节点
   * @param element
   */
  appendTo(element: HTMLElement) {
    element.appendChild(this.canvas)
  }
}
