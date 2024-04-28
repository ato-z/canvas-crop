/**
 * 提供基础的坐标转换方法
 */
export class Base {
  constructor(protected el: HTMLCanvasElement) {}

  /**
   * 传入鼠标事件返回统一坐标系
   * @param event
   */
  protected getPointByMouse(event: MouseEvent) {
    const rect = this.el.getBoundingClientRect()
    return { x: event.pageX - rect.left, y: event.pageY - rect.top }
  }

  /**
   * 传入手指触摸事件返回统一坐标系
   * @param event
   */
  protected getPointByTouch(event: TouchEvent) {
    const rect = this.el.getBoundingClientRect()
    const [touch] = event.touches
    return { x: touch.pageX - rect.left, y: touch.pageY - rect.top }
  }

  /**
   * 事件坐标点转画布坐标点
   */
  protected pointToCanvas(point: POINT) {
    const { el } = this
    const { offsetWidth, offsetHeight, width, height } = el

    return {
      x: (point.x * width) / offsetWidth,
      y: (point.y * height) / offsetHeight,
    }
  }
}
