/**
 * 创建矩阵信息
 */
const angle = Math.PI / 180
export class Rect implements RECT {
  // 是否可以超出边界
  overstep = false

  // 1度的弧度
  readonly angle = angle

  // 当前视图信息
  view = {
    // 宽度
    w: 0,

    // 高度
    h: 0,

    // x轴偏移量
    x: 0,

    // y轴偏移量
    y: 0,

    // 旋转角度
    a: 0,
  }

  // 父级容器的宽高
  parentRect = {
    w: 0,
    h: 0,
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
    const a = this.view.a % 360

    switch (a) {
      case 0:
        return [x, y]
      case 90:
        return [y, -x]
      case 180:
        return [-x, -y]
      case 270:
        return [-y, x]
    }

    return [x, y]
  }

  /**
   * 当前矩阵的一次快照信息
   */
  toJSON(): RECT['view'] {
    return JSON.parse(JSON.stringify(this.view))
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
}
