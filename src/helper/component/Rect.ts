/**
 * 绘图相关的坐标系
 */
export class Rect {
  // 是否可以超出边界
  overstep = false

  // 当前视图信息
  protected view = {
    w: 0, // 宽度
    h: 0, // 高度
    x: 0, // x轴偏移量
    y: 0, // y轴偏移量
    a: 0, // 旋转角度
  }

  // 父级容器的宽高
  protected parentRect = {
    w: 0, // 宽度
    h: 0, // 高度
  }

  /**
   * 最小x轴偏移量
   */
  get minX() {
    return this.parentRect.w - this.view.w
  }

  /**
   * 最小y轴偏移量
   */
  get minY() {
    return this.parentRect.h - this.view.h
  }

  /**
   * 计算当角度存在时，偏移量的转换
   */
  private withAngle(x: number, y: number) {
    const angle = this.view.a % 360
    const radians = (-angle * Math.PI) / 180

    const newX = x * Math.cos(radians) - y * Math.sin(radians)
    const newY = x * Math.sin(radians) + y * Math.cos(radians)

    return [newX, newY]
  }

  /**
   * 返回当前矩阵的快照信息
   */
  get viewSnapshot() {
    return JSON.parse(JSON.stringify(this.view))
  }

  constructor(protected el: HTMLCanvasElement) {
    this.setParentRect({ w: el.width, h: el.height })
  }

  /**
   * 设置父级容器的宽高
   */
  setParentRect({ w, h }: { w?: number; h?: number }) {
    if (w !== undefined) this.parentRect.w = w
    if (h !== undefined) this.parentRect.h = h
  }

  /**
   * 设置是否允许跨界
   * @param overstep
   */
  setOverstep(overstep: boolean) {
    this.overstep = overstep
  }

  /**
   * 更新当前矩阵信息
   * @param view
   */
  setView(view: Partial<typeof this.view>) {
    Object.assign(this.view, view)
  }

  /**
   * 对矩阵进行偏移操作
   * @param offsetX x轴的偏移量
   * @param offsetY y轴的偏移量
   */
  offset(offsetX: number, offsetY: number) {
    ;[offsetX, offsetY] = this.withAngle(offsetX, offsetY)

    let x = this.view.x + offsetX
    let y = this.view.y + offsetY

    // 如果不允许超过边界
    if (!this.overstep) {
      x = Math.min(0, Math.max(this.minX, x))
      y = Math.min(0, Math.max(this.minY, y))
    }

    this.view.x = x
    this.view.y = y
  }

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
