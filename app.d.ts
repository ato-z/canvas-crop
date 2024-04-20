declare module '*.webp' {
  export default string
}

declare module '*.png' {
  export default string
}

interface CanvasRenderingContext2D {
  /**
   * 清空画布
   */
  clear(): void

  /**
   * 绘制图像并缩放dpr
   */
  drawImageByDpr(
    ...args: Parameters<CanvasRenderingContext2D['drawImage']>
  ): void

  /**
   * 绘制文字并自动计算dpr位置
   * @param args
   */
  // fillTextByDpr(...args: Parameters<CanvasRenderingContext2D['fillText']>): void
}

interface CANVAS_CONSOLE {
  readonly width: number // 画布逻辑宽度
  readonly height: number // 画布逻辑高度
  readonly dpr: number // dpr 缩放比例
  readonly rpx: number // 1像素大的文字大小

  readonly canvas: HTMLCanvasElement
  readonly context: CanvasRenderingContext2D
  readonly components: Array<CANVAS_COMPONENT>

  /**
   * 添加组件
   * @param c
   */
  push(c: CANVAS_COMPONENT): void

  /**
   * 添加到父级节点
   * @param el
   */
  appendTo(el: HTMLElement): void
}

interface CANVAS_COMPONENT {
  order?: number // 绘制顺序，数字越大 绘制在顶层

  /**
   * 绘制前触发
   * @param canvas
   */
  handleBefore?: (canvas: CANVAS_CONSOLE) => void

  /**
   * 绘制的句柄函数
   * @param canvas
   */
  handle(canvas: CANVAS_CONSOLE): void

  /**
   * 绘制后触发
   * @param canvas
   */
  handleAfter?: (canvas: CANVAS_CONSOLE) => void
}
