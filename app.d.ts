declare module '*.webp' {
  export default string
}

declare module '*.png' {
  export default string
}

type POINT = { x: number; y: number }

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

  /**
   * 绘制矩形虚线
   */
  drawDashedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    dashLength: number,
    cornerRadius?: number
  ): void
}
